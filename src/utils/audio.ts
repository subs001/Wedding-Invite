/**
 * Web Audio API synthesizer for offline-friendly, high-fidelity Indian wedding music simulation.
 * Includes a Tanpura drone, auspicious temple chimes (Raga Mohanam), and drum synthesis.
 */

class WeddingAudioEngine {
  private ctx: AudioContext | null = null;
  private droneOscs: OscillatorNode[] = [];
  private droneGain: GainNode | null = null;
  private isMelodyPlaying = false;
  private melodyInterval: number | null = null;

  // Auspicious South Indian scale (Raga Mohanam/Bhupali: C-D-E-G-A)
  private readonly mohanamScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];

  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    } catch (e) {
      console.error("Web Audio API not supported", e);
    }
  }

  // Toggles the continuous warm Shruti Box (tanpura) background drone
  toggleDrone(state: boolean) {
    this.init();
    if (!this.ctx) return;

    if (state) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      // If already playing, don't start copies
      if (this.droneOscs.length > 0) return;

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.droneGain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 1.5);
      this.droneGain.connect(this.ctx.destination);

      // Base C3 frequency (130.81 Hz), fifth G3 (196.00 Hz), octave C4 (261.63)
      const baseFreqs = [130.81, 196.00, 261.63, 329.63]; 
      
      baseFreqs.forEach((freq, idx) => {
        if (!this.ctx || !this.droneGain) return;
        const osc = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        
        // Use triangle or sawtooth wave for warm rich string-like harmonics
        osc.type = idx % 2 === 0 ? "triangle" : "sine";
        osc.frequency.value = freq + (Math.random() - 0.5) * 0.4; // fine detuning

        // Slow panning/tremolo to simulate natural strings
        subGain.gain.setValueAtTime(idx === 0 ? 0.4 : 0.2, this.ctx.currentTime);
        
        osc.connect(subGain);
        subGain.connect(this.droneGain);
        osc.start();
        this.droneOscs.push(osc);
      });

      this.startMelodyTimer();
    } else {
      // Fade out and stop oscillations
      if (this.droneGain && this.ctx) {
        try {
          this.droneGain.gain.setValueAtTime(this.droneGain.gain.value, this.ctx.currentTime);
          this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.0);
          
          const currentOscs = [...this.droneOscs];
          this.droneOscs = [];
          
          setTimeout(() => {
            currentOscs.forEach(o => {
              try { o.stop(); } catch{}
            });
          }, 1100);
        } catch {}
      }
      this.stopMelodyTimer();
    }
  }

  // Ring a celestial temple bell
  playTempleBell(volume = 0.5) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const now = this.ctx.currentTime;
    
    // Deep bell requires layering multiple core frequencies and inharmonic partials
    const bellFrequencies = [220, 442, 540, 660, 880, 1200];
    const decayRates = [1.8, 1.4, 1.0, 0.8, 0.5, 0.3];

    const mainGain = this.ctx.createGain();
    mainGain.gain.setValueAtTime(0, now);
    mainGain.gain.linearRampToValueAtTime(volume * 0.4, now + 0.01);
    mainGain.connect(this.ctx.destination);

    bellFrequencies.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      oscGain.gain.setValueAtTime(0.3, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + decayRates[i]);

      osc.connect(oscGain);
      oscGain.connect(mainGain);

      osc.start(now);
      osc.stop(now + decayRates[i] + 0.1);
    });
  }

  // Play a random pleasing note from Raga Mohanam
  playMohanamNote(duration = 0.8) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const now = this.ctx.currentTime;
    const notesPool = this.mohanamScale;
    const randomFreq = notesPool[Math.floor(Math.random() * notesPool.length)];

    // Synthesize a beautiful soft flute-like bell sound
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(randomFreq, now);
    
    // Warm subharmonic resonance
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(randomFreq / 2, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.12, now + 0.08); // soft envelope attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gainNode);
    subOsc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + duration + 0.1);
    subOsc.stop(now + duration + 0.1);
  }

  // Synthesize drum beat (Dhol/Tabla bass sound)
  playDholBeat(type: "bass" | "treble") {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === "suspended") this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    if (type === "bass") {
      // Rich resonant thud
      osc.type = "sine";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.12);

      gainNode.gain.setValueAtTime(0.4, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    } else {
      // Sharp crisp snap
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);

      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    }

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Starts a slow ambient melody scheduler playing warm random notes over the drone
  private startMelodyTimer() {
    this.isMelodyPlaying = true;
    const triggerNext = () => {
      if (!this.isMelodyPlaying) return;
      this.playMohanamNote(Math.random() * 0.8 + 0.6);
      
      const nextDelay = Math.random() * 2500 + 1200; // interval spacing
      this.melodyInterval = setTimeout(triggerNext, nextDelay) as any;
    };
    
    // Initial note delay
    this.melodyInterval = setTimeout(triggerNext, 1000) as any;
  }

  private stopMelodyTimer() {
    this.isMelodyPlaying = false;
    if (this.melodyInterval) {
      clearTimeout(this.melodyInterval);
      this.melodyInterval = null;
    }
  }
}

export const WeddingAudio = new WeddingAudioEngine();
export default WeddingAudio;
