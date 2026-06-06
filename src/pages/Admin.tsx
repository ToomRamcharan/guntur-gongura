import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Utensils, 
  Image as ImageIcon, 
  Star, 
  Users, 
  ShoppingBag, 
  Settings,
  LogOut,
  Plus
} from 'lucide-react';
import { useAuth } from '../lib/auth.tsx';
import { cn } from '../lib/utils.ts';

export default function Admin() {
  const { user, loading, signIn, logOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-slate-900 px-4">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white p-12 rounded-[40px] shadow-2xl max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-8">
             <LayoutDashboard className="w-10 h-10 text-brand-orange" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-2">Admin Portal</h1>
          <p className="text-slate-500 mb-10">Secure access for Guntur Gongoora management only.</p>
          <button
            onClick={signIn}
            className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold text-lg hover:bg-brand-red transition-all shadow-xl shadow-brand-orange/30"
          >
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'menu', icon: Utensils, label: 'Menu Items' },
    { id: 'special', icon: Star, label: 'Today\'s Special' },
    { id: 'orders', icon: ShoppingBag, label: 'Pickup Orders' },
    { id: 'leads', icon: Users, label: 'Customer Leads' },
    { id: 'gallery', icon: ImageIcon, label: 'Gallery' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col">
        <div className="p-8">
           <h2 className="text-brand-orange font-display font-bold text-xl tracking-tight leading-none mb-1">GUNTUR</h2>
           <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/50">Admin Control</span>
        </div>
        
        <nav className="flex-grow px-4 space-y-2">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all",
                activeTab === item.id 
                  ? "bg-brand-orange text-white" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
           <div className="flex items-center gap-4 mb-6">
              <img src={user.photoURL || ''} alt="User" className="w-10 h-10 rounded-full border-2 border-brand-orange" />
              <div>
                 <div className="text-xs font-bold truncate max-w-[120px]">{user.displayName}</div>
                 <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Manager</div>
              </div>
           </div>
           <button
             onClick={logOut}
             className="w-full flex items-center justify-center gap-2 py-3 border border-white/10 rounded-xl text-xs font-bold hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30 transition-all uppercase tracking-widest"
           >
             <LogOut className="w-4 h-4" />
             Sign Out
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-12">
             <h1 className="text-3xl font-display font-bold text-slate-900">
               {sidebarItems.find(i => i.id === activeTab)?.label}
             </h1>
             <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg hover:bg-black transition-all">
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
             </div>
          </header>

          {/* Tab Content Placements */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Total Visitors</span>
                <span className="text-4xl font-black text-slate-900">4,820</span>
                <span className="text-xs text-green-500 font-bold">+12% vs last week</span>
             </div>
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Orders Today</span>
                <span className="text-4xl font-black text-slate-900">24</span>
                <span className="text-xs text-brand-orange font-bold">8 Pending Pickup</span>
             </div>
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Leads Collected</span>
                <span className="text-4xl font-black text-slate-900">156</span>
                <span className="text-xs text-brand-yellow font-bold">42 Birthdays this month</span>
             </div>
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-4">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Avg. Rating</span>
                <span className="text-4xl font-black text-slate-900">4.8</span>
                <div className="flex gap-1 text-brand-yellow"><Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" /> <Star className="w-4 h-4 fill-current" /></div>
             </div>
          </div>

          <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10 overflow-hidden">
             <p className="text-slate-400 italic">Manage your {activeTab} details here. Connect Firebase to start real-time management.</p>
             
             {/* Sample Table for Menu Items */}
             {activeTab === 'menu' && (
               <table className="w-full mt-10">
                 <thead>
                   <tr className="text-left border-b border-slate-100 pb-4">
                      <th className="pb-4 font-bold text-sm text-slate-400 uppercase tracking-widest">Dish Name</th>
                      <th className="pb-4 font-bold text-sm text-slate-400 uppercase tracking-widest">Price</th>
                      <th className="pb-4 font-bold text-sm text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="pb-4 font-bold text-sm text-slate-400 uppercase tracking-widest">Category</th>
                      <th className="pb-4"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-slate-50">
                       <td className="py-6 font-bold text-slate-800">Special Gongoora Mutton</td>
                       <td>₹449</td>
                       <td><span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">Active</span></td>
                       <td className="text-slate-500 font-medium">Mutton Curries</td>
                       <td className="text-right"><button className="text-brand-orange font-bold text-xs uppercase tracking-widest">Edit</button></td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                       <td className="py-6 font-bold text-slate-800">Chicken 65 (Wet)</td>
                       <td>₹280</td>
                       <td><span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">Active</span></td>
                       <td className="text-slate-500 font-medium">Non-Veg Starters</td>
                       <td className="text-right"><button className="text-brand-orange font-bold text-xs uppercase tracking-widest">Edit</button></td>
                    </tr>
                 </tbody>
               </table>
             )}
          </div>
        </div>
      </main>
    </div>
  );
}
