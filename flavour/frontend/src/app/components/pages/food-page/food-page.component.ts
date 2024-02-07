import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  // Property to hold information about the selected food
  food!: Food;

  constructor(
    // Injecting ActivatedRoute, FoodService, CartService, and Router
    activatedRoute: ActivatedRoute,
    foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    // Subscribe to route parameter changes to fetch and display the selected food
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        // Fetch the food by its ID from the FoodService
        foodService.getFoodById(params.id).subscribe((serverFood) => (this.food = serverFood));
      }
    });
  }

  ngOnInit(): void {
    
  }

  // Method to add the selected food to the cart
  addToCart() {
    // Call the addToCart method in the CartService
    this.cartService.addToCart(this.food);
    // Navigate to the cart page after adding the food to the cart
    this.router.navigateByUrl('/cart-page');
  }
}


/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  constructor(activatedRoute:ActivatedRoute, foodService:FoodService,
    private cartService:CartService, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
        foodService.getFoodById(params.id).subscribe((serverFood)=>this.food=serverFood)
    })
    
   }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
} */