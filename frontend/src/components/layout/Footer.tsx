import { Leaf, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-eco-forest-dark text-primary-foreground py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-eco-lime/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-eco-lime" />
              </div>
              <span className="text-xl font-bold">EcoTrack</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Rewarding sustainable actions, one step at a time. Join millions making a positive impact on our planet.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Activities</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/walk" className="hover:text-eco-lime transition-colors">Walking Tracker</Link></li>
              <li><Link to="/trees" className="hover:text-eco-lime transition-colors">Tree Plantation</Link></li>
              <li><Link to="/transport" className="hover:text-eco-lime transition-colors">Public Transport</Link></li>
              <li><Link to="/plastic" className="hover:text-eco-lime transition-colors">Plastic Collection</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/rewards" className="hover:text-eco-lime transition-colors">Rewards</Link></li>
              <li><a href="#" className="hover:text-eco-lime transition-colors">Leaderboard</a></li>
              <li><a href="#" className="hover:text-eco-lime transition-colors">Impact Report</a></li>
              <li><a href="#" className="hover:text-eco-lime transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-eco-lime transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-eco-lime transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-eco-lime transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-eco-lime transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © 2024 EcoTrack. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/60 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-eco-orange fill-eco-orange" /> for the Planet
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
