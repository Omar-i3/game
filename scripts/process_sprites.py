# ============================================================================
# Arab Gamers: Automated Sprite Sheet Background Removal & Cropping Script
# ============================================================================

import os
import numpy as np
from PIL import Image

def process_all_sprites():
    os.makedirs('assets/sprites', exist_ok=True)

    chars = [
        ('banderita', 'banderita_raw.png'),
        ('mlzlz', 'mlzlz_raw.png'),
        ('ocmz', 'ocmz_raw.png'),
        ('3gaming', '3gaming_raw.png'),
        ('opiilz', 'opiilz_raw.png')
    ]

    def crop_bbox(rgba_arr):
        alpha = rgba_arr[:, :, 3]
        y_indices, x_indices = np.where(alpha > 10)
        if len(y_indices) == 0:
            return None
        min_x, max_x = int(np.min(x_indices)), int(np.max(x_indices))
        min_y, max_y = int(np.min(y_indices)), int(np.max(y_indices))
        return rgba_arr[min_y:max_y+1, min_x:max_x+1]

    for name, fname in chars:
        if not os.path.exists(fname):
            print(f"Skipping {fname}, file not found.")
            continue

        im = Image.open(fname).convert('RGB')
        w, h = im.size
        arr = np.array(im)

        # Sample background color from outer borders
        border_pixels = np.concatenate([
            arr[0:15, :, :].reshape(-1, 3),
            arr[-15:, :, :].reshape(-1, 3),
            arr[:, 0:15, :].reshape(-1, 3),
            arr[:, -15:, :].reshape(-1, 3)
        ])
        bg_color = np.median(border_pixels, axis=0)

        dist = np.linalg.norm(arr.astype(float) - bg_color, axis=2)
        alpha = np.clip((dist - 18) * 15, 0, 255).astype(np.uint8)

        rgba = np.zeros((h, w, 4), dtype=np.uint8)
        rgba[:, :, :3] = arr
        rgba[:, :, 3] = alpha

        mid_y = int(h * 0.48)
        mid_x = int(w * 0.5)

        # 1. Idle (Top Left)
        idle_raw = rgba[0:mid_y, 0:mid_x]
        idle_cropped = crop_bbox(idle_raw)
        if idle_cropped is not None:
            Image.fromarray(idle_cropped, 'RGBA').save(f'assets/sprites/{name}_idle.png')
            print(f"Saved: assets/sprites/{name}_idle.png")

        # 2. Avatar (Top Right)
        avatar_raw = rgba[0:mid_y, mid_x:w]
        avatar_cropped = crop_bbox(avatar_raw)
        if avatar_cropped is not None:
            Image.fromarray(avatar_cropped, 'RGBA').save(f'assets/sprites/avatar_{name}.png')
            print(f"Saved: assets/sprites/avatar_{name}.png")

        # 3. Walk Strip (Bottom Left)
        walk_raw = rgba[mid_y:h, 0:mid_x]
        walk_cropped = crop_bbox(walk_raw)
        if walk_cropped is not None:
            Image.fromarray(walk_cropped, 'RGBA').save(f'assets/sprites/{name}_walk.png')
            print(f"Saved: assets/sprites/{name}_walk.png")

        # 4. Attack Strip (Bottom Right)
        attack_raw = rgba[mid_y:h, mid_x:w]
        attack_cropped = crop_bbox(attack_raw)
        if attack_cropped is not None:
            Image.fromarray(attack_cropped, 'RGBA').save(f'assets/sprites/{name}_attack.png')
            print(f"Saved: assets/sprites/{name}_attack.png")

if __name__ == '__main__':
    process_all_sprites()
