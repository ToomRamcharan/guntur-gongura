import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

export default function ContactsMap() {
  const address = "Ayyappa Society, Mega Hills, Madhapur, Hyderabad, Telangana 500081";
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_PLATFORM_KEY}&q=Guntur+Gongoora+Madhapur+Hyderabad`;

  return (
    <section id="contact" className="py-24 px-4 md:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>
              <span className="text-brand-orange font-bold text-sm tracking-[0.2em] uppercase mb-4 block underline decoration-brand-orange underline-offset-8 decoration-2">Find Us</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight">Visit Us for a <br /><span className="text-brand-orange">Sensory Feast</span></h2>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-brand-orange transition-transform group-hover:scale-110">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-slate-900">Our Location</h4>
                  <p className="text-slate-500 leading-relaxed max-w-sm">{address}</p>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-brand-orange font-bold hover:gap-4 transition-all"
                  >
                    Get Directions <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-16 h-16 shrink-0 bg-white rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center text-brand-orange transition-transform group-hover:scale-110">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 text-slate-900">Reservation & Inquiries</h4>
                  <p className="text-slate-500 text-lg font-medium">09030023124</p>
                  <p className="text-brand-red text-sm font-bold mt-1">Accepting table bookings for 4+ persons</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[32px] text-white flex items-center justify-between">
               <div>
                  <h5 className="font-bold text-lg text-brand-yellow">Now Hosting Events!</h5>
                  <p className="text-slate-400 text-sm mt-1">Birthday, festive parties & corporate dinners.</p>
               </div>
               <button className="bg-white/10 hover:bg-brand-orange p-3 rounded-full transition-all">
                  <ExternalLink className="w-6 h-6" />
               </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[600px] bg-slate-200 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white relative group"
          >
            {process.env.GOOGLE_MAPS_PLATFORM_KEY ? (
               <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapEmbedUrl}
                title="Google Maps Location"
              ></iframe>
            ) : (
               <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 p-10 text-center">
                  <MapPin className="w-16 h-16 text-slate-300 mb-6" />
                  <p className="text-slate-500 font-medium">Map view requires a Google Maps API Key.<br />Please get directions via the button on the left.</p>
               </div>
            )}
            
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-xs font-bold text-slate-800 border border-slate-100">
                  Interactive View
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
