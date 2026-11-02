"use client";

import React, { useState } from "react";
import { X, Users, Calendar, Sparkles, CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CateringModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
}

export default function CateringModal({
  isOpen,
  onClose,
  initialPackage = "Office Gathering",
}: CateringModalProps) {
  const { addItem } = useCart();
  const [selectedPkg, setSelectedPkg] = useState(initialPackage);
  const [guestCount, setGuestCount] = useState(20);
  const [eventDate, setEventDate] = useState("");
  const [notes, setNotes] = useState("");
  const [dietary, setDietary] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const dietaryOptions = ["Halal", "Vegetarian", "Gluten-Free", "Nut-Free"];

  const toggleDietary = (opt: string) => {
    setDietary((prev) =>
      prev.includes(opt) ? prev.filter((d) => d !== opt) : [...prev, opt]
    );
  };

  const estimatedCost = Math.round(guestCount * 14.5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addItem({
      id: `catering-custom-${Date.now()}`,
      name: `Catering: ${selectedPkg} (${guestCount} Guests)`,
      price: estimatedCost,
      image: "/figma/catering-office.png",
      category: "Catering",
      options: `${guestCount} Guests • Date: ${eventDate || "TBD"} ${dietary.length ? `• ${dietary.join(", ")}` : ""}`,
    });
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
      }`}
      aria-hidden={!isOpen}
    >
      {/* Backdrop with smooth fade transition */}
      <div
        className={`fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal with scale & fade transition */}
      <div
        className={`relative w-full max-w-lg bg-[#4D0711] text-[#FEFEF6] rounded-[28px] border border-[#FEFEF6]/20 p-6 sm:p-8 z-10 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-3"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-[#FEFEF6]/70 hover:text-white hover:rotate-90 transition-all duration-200"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-phudu text-2xl font-bold mb-2">Catering Booked!</h3>
            <p className="text-sm text-[#FEFEF6]/80 max-w-sm">
              We&apos;ve added your customized catering plan to your order and our chef will reach out to confirm your setup.
            </p>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FD7E3B]/20 text-[#FD7E3B] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Event Catering Builder</span>
            </div>
            <h3 className="font-phudu font-black text-2xl sm:text-3xl text-[#FEFEF6] mb-1">
              Customize Your Feast
            </h3>
            <p className="text-xs sm:text-sm text-[#FEFEF6]/70 mb-6">
              Tell us about your event and we&apos;ll craft hot flame-grilled trays right to your venue.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Package selector */}
              <div>
                <label className="block text-xs font-phudu font-semibold mb-1.5 text-[#FEEDCF]">
                  Select Package
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["Office Gathering", "Game Night", "Wedding Feast"].map((pkg) => (
                    <button
                      type="button"
                      key={pkg}
                      onClick={() => setSelectedPkg(pkg)}
                      className={`p-2.5 rounded-xl text-xs font-phudu font-bold border transition-all text-center ${
                        selectedPkg === pkg
                          ? "bg-[#FD7E3B] border-[#FD7E3B] text-white"
                          : "bg-[#37050C] border-[#FEFEF6]/20 text-[#FEFEF6]/80 hover:border-white/40"
                      }`}
                    >
                      {pkg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Count Slider */}
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="font-phudu font-semibold text-[#FEEDCF] flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#FD7E3B]" /> Guests:
                  </span>
                  <span className="font-phudu font-bold text-[#FD7E3B] text-sm">
                    {guestCount} People
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={150}
                  step={5}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full accent-[#FD7E3B] cursor-pointer"
                />
              </div>

              {/* Date & Time */}
              <div>
                <label className="block text-xs font-phudu font-semibold mb-1.5 text-[#FEEDCF] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FD7E3B]" /> Event Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#37050C] border border-[#FEFEF6]/20 text-xs text-[#FEFEF6] focus:outline-none focus:border-[#FD7E3B]"
                />
              </div>

              {/* Dietary preferences */}
              <div>
                <label className="block text-xs font-phudu font-semibold mb-1.5 text-[#FEEDCF]">
                  Dietary Preferences
                </label>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => toggleDietary(opt)}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                        dietary.includes(opt)
                          ? "bg-[#FD7E3B] border-[#FD7E3B] text-white"
                          : "bg-[#37050C] border-[#FEFEF6]/20 text-[#FEFEF6]/70"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional notes */}
              <div>
                <label className="block text-xs font-phudu font-semibold mb-1.5 text-[#FEEDCF]">
                  Special Instructions
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any particular sides, burger preferences, delivery time..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#37050C] border border-[#FEFEF6]/20 text-xs text-[#FEFEF6] placeholder-[#FEFEF6]/40 focus:outline-none focus:border-[#FD7E3B]"
                />
              </div>

              {/* Estimate & Submit */}
              <div className="pt-2 flex items-center justify-between border-t border-[#FEFEF6]/15">
                <div>
                  <span className="text-xs text-[#FEFEF6]/70 block">Estimated Package:</span>
                  <span className="font-phudu font-black text-2xl text-[#FD7E3B]">
                    ${estimatedCost}
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#FD7E3B] hover:bg-[#e66a27] font-phudu font-bold text-sm text-white transition-all active:scale-95 cursor-pointer"
                >
                  Book Catering
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

