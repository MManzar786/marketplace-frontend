import { CommonModule } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './state/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth/auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { productReducer } from './state/products/product.reducer';
import { ProductEffects } from './state/products/product.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CartEffects } from './state/cart/cart.effect';
import { cartReducer } from './state/cart/cart.reducer';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      auth: authReducer,
      product: productReducer,
      cart: cartReducer,
    }),
    EffectsModule.forRoot([AuthEffects, ProductEffects, CartEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
