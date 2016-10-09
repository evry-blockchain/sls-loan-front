

import { Routes, RouterModule } from '@angular/router';

const router: Routes = [
  {
    path: 'chat',
    children: [
      {
        path: '',

      }
    ]
  }
];

export const chatRouting = router;
