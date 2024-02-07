import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //hold an array of Food objects
  foods: Food[] = [];

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    // Declare an Observable to hold the result of foodService methods based on route parameters
    let foodObservable: Observable<Food[]>;

    // Subscribe to route parameter changes
    activatedRoute.params.subscribe((params) => {
      // Check if a search term is provided in the route parameters
      if (params.searchTerm)
        // Fetch foods based on the provided search term
        foodObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      // Check if a tag is provided in the route parameters
      else if (params.tag)
        // Fetch foods based on the provided tag
        foodObservable = this.foodService.getAllFoodsByTag(params.tag);
      // Fetch all foods if no specific parameters are provided
      else
        foodObservable = foodService.getAll();
      
      // Subscribe to the Observable and update the 'foods' property accordingly
      foodObservable.subscribe((serverFoods) => (this.foods = serverFoods));
    });
  }

  ngOnInit(): void {
  
  }

}


/* import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    let foodObservable:Observable<Food[]>
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        foodObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if (params.tag)
      foodObservable = this.foodService.getAllFoodsByTag(params.tag);
      else
      foodObservable = foodService.getAll();
    foodObservable.subscribe((serverFoods)=>this.foods=serverFoods)
    
    
    })

  }

  ngOnInit(): void {
    
  }
  foodie(){
    for(let food of this.foods){
      console.log(food);
      
    }
  }

} */