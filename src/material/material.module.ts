import { NgModule } from '@angular/core';

import { MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatButtonModule, MatMenuModule, MatDividerModule, MatDialogModule } from "@angular/material";

@NgModule({
  exports: [
      MatToolbarModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatButtonModule,
      MatMenuModule,
      MatDividerModule,
      MatDialogModule
  ],
  providers: [],
  bootstrap: []
})
export class MaterialModule { }