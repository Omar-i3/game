// ============================================================================
// Arab Gamers: Pixel Legends - Particle & Visual Effects Engine
// ============================================================================

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.floatingTexts = [];
    this.shockwaves = [];
  }

  reset() {
    this.particles = [];
    this.floatingTexts = [];
    this.shockwaves = [];
  }

  // --------------------------------------------------------------------------
  // Core Particle Spawners
  // --------------------------------------------------------------------------
  add(x, y, vx, vy, color, size, life, shape = 'square', gravity = 0.15) {
    this.particles.push({
      x, y, vx, vy, color, size,
      maxLife: life,
      life: life,
      shape: shape, // 'square', 'circle', 'potato', 'block', 'ghost', 'spark'
      gravity: gravity,
      alpha: 1,
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.2
    });
  }

  // Burst explosion with sparks
  burst(x, y, count = 20, colors = ['#ffcc00', '#ff4400', '#ffffff'], minSpeed = 2, maxSpeed = 7) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 3 + Math.random() * 5;
      const life = 20 + Math.random() * 25;
      this.add(x, y, vx, vy, color, size, life, 'square', 0.18);
    }
  }

  // Banderita: Potato Rage Fiery Explosion
  potatoRageBlast(x, y) {
    // Shockwave ring
    this.shockwaves.push({
      x, y,
      radius: 10,
      maxRadius: 180,
      color: '#ff3300',
      width: 8,
      life: 25,
      maxLife: 25
    });

    // Explosive flying flaming potatoes and fiery pixel embers
    for (let i = 0; i < 35; i++) {
      const angle = (Math.PI * 2 / 35) * i + (Math.random() - 0.5) * 0.3;
      const speed = 4 + Math.random() * 8;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const size = 6 + Math.random() * 6;
      this.add(x, y, vx, vy, '#f5b041', size, 35 + Math.random() * 20, 'potato', 0.2);
    }

    // Fire sparks
    this.burst(x, y, 40, ['#ff0033', '#ff6600', '#ffff00', '#ffffff'], 4, 11);
  }

  // MLZLZ: Horror Flash Stun & Ghost Apparitions
  horrorFlash(x, y) {
    this.shockwaves.push({
      x, y,
      radius: 10,
      maxRadius: 220,
      color: '#00ffff',
      width: 6,
      life: 30,
      maxLife: 30
    });

    // Summon ethereal floating pixel ghosts
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 / 12) * i;
      const speed = 3 + Math.random() * 4;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 1.5;
      this.add(x, y, vx, vy, '#5dade2', 10, 45 + Math.random() * 20, 'ghost', -0.05);
    }
  }

  // oCMz: Minecraft Pixel TNT / Block Wall Explosion
  blockBarrageImpact(x, y) {
    this.burst(x, y, 25, ['#58d68d', '#28b463', '#a569bd', '#e74c3c'], 3, 9);
    for (let i = 0; i < 15; i++) {
      const vx = (Math.random() - 0.5) * 8;
      const vy = -3 - Math.random() * 6;
      this.add(x, y, vx, vy, '#2ecc71', 8, 30 + Math.random() * 15, 'block', 0.35);
    }
  }

  // 3Gaming: Redstone Sparks & Turret Bullets
  redstoneSparks(x, y) {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      this.add(x, y, vx, vy, '#e74c3c', 4, 18, 'spark', 0.05);
    }
  }

  // oPiiLz: Neon Hoverboard Flame Trail
  neonTrail(x, y, dir) {
    for (let i = 0; i < 4; i++) {
      const vx = -dir * (2 + Math.random() * 3);
      const vy = (Math.random() - 0.5) * 2;
      const colors = ['#9b59b6', '#8e44ad', '#e056fd', '#f368e0', '#00d2d3'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.add(x, y + 8, vx, vy, color, 4 + Math.random() * 4, 15 + Math.random() * 10, 'square', 0.02);
    }
  }

  // Floating text / combat numbers
  addFloatingText(x, y, text, color = '#ffeb3b', size = 14, icon = '') {
    this.floatingTexts.push({
      x, y,
      text: icon ? `${icon} ${text}` : text,
      color,
      size,
      vy: -2,
      vx: (Math.random() - 0.5) * 0.8,
      life: 40,
      maxLife: 40
    });
  }

  // Confetti celebration
  spawnConfetti(canvasWidth, canvasHeight, count = 100) {
    const colors = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#9b59b6', '#eccc68', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvasWidth;
      const y = -20 - Math.random() * 100;
      const vx = (Math.random() - 0.5) * 4;
      const vy = 2 + Math.random() * 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.add(x, y, vx, vy, color, 5 + Math.random() * 4, 120 + Math.random() * 60, 'square', 0.05);
    }
  }

  // --------------------------------------------------------------------------
  // Update Cycle
  // --------------------------------------------------------------------------
  update() {
    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.life--;
      p.alpha = Math.max(0, p.life / p.maxLife);

      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.radius += (sw.maxRadius - sw.radius) * 0.18;
      sw.life--;
      if (sw.life <= 0) {
        this.shockwaves.splice(i, 1);
      }
    }

    // Update floating texts
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.x += ft.vx;
      ft.y += ft.vy;
      ft.vy *= 0.95;
      ft.life--;
      if (ft.life <= 0) {
        this.floatingTexts.splice(i, 1);
      }
    }
  }

  // --------------------------------------------------------------------------
  // Render Cycle
  // --------------------------------------------------------------------------
  draw(ctx, cameraX = 0, cameraY = 0) {
    ctx.save();

    // Draw shockwaves
    for (const sw of this.shockwaves) {
      const alpha = sw.life / sw.maxLife;
      ctx.beginPath();
      ctx.arc(sw.x - cameraX, sw.y - cameraY, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = sw.color;
      ctx.lineWidth = sw.width * alpha;
      ctx.globalAlpha = alpha;
      ctx.stroke();
    }

    // Draw particles
    for (const p of this.particles) {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x - cameraX, p.y - cameraY);
      ctx.rotate(p.rotation);

      if (p.shape === 'potato') {
        // Draw cute retro golden potato
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.2, p.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        // Potato spots
        ctx.fillStyle = '#b7791f';
        ctx.fillRect(-2, -1, 2, 2);
        ctx.fillRect(2, 1, 2, 2);
      } else if (p.shape === 'block') {
        // Pixel block (Minecraft grass/tnt style)
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.fillStyle = '#1e8449';
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.35);
      } else if (p.shape === 'ghost') {
        // Pixel ghost silhouette
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, -2, p.size * 0.6, Math.PI, 0);
        ctx.lineTo(p.size * 0.6, p.size * 0.6);
        ctx.lineTo(-p.size * 0.6, p.size * 0.6);
        ctx.closePath();
        ctx.fill();
        // Glowing red eyes
        ctx.fillStyle = '#ff0033';
        ctx.fillRect(-3, -3, 2, 2);
        ctx.fillRect(1, -3, 2, 2);
      } else {
        // Standard crisp pixel square / spark
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      }

      ctx.restore();
    }

    // Draw floating texts with pixel font outline
    for (const ft of this.floatingTexts) {
      const alpha = ft.life / ft.maxLife;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = `bold ${ft.size}px 'Press Start 2P', 'Cairo', monospace, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Text stroke for arcade readability
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 3;
      ctx.strokeText(ft.text, ft.x - cameraX, ft.y - cameraY);

      // Text fill
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, ft.x - cameraX, ft.y - cameraY);
      ctx.restore();
    }

    ctx.restore();
  }
}

window.particles = new ParticleSystem();
