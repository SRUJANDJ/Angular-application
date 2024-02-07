import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Orders';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  // Initializing an Order object to represent the user's order
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(
    cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router
  ) {
    // Retrieve cart information from the CartService and set it in the order
    const cart = cartService.getCart();
    
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    // Initialize the checkout form with user's name and address
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required]
    });
  }

  // Getter for easy access to form controls in the template
  get fc() {
    return this.checkoutForm.controls;
  }

  // Method to create an order
  createOrder() {
    // Check if the form is invalid and show a warning
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill in the inputs', 'Invalid inputs');
      return;
    }

    // Check if the user has selected a location on the map
    if (!this.order.addressLatLng) {
      this.toastrService.warning('Please select your location on the map', 'Invalid inputs');
      return;
    }

    // Set the name and address in the order object
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    // Call the OrderService to create the order
    this.orderService.create(this.order).subscribe({
      next: () => {
        // Navigate to the payment page on successful order creation
        this.router.navigateByUrl('/payment');
      },
      error: (errorResponse) => {
        // Display an error message using ToastrService in case of an error
        this.toastrService.error(errorResponse.error, 'Order');
      }
    });
  }
}


/* import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/models/Orders';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order:Order=new Order()
  checkoutForm!:FormGroup
  constructor(
    cartService:CartService,
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService,
    private orderService:OrderService,
    private router:Router
  ){
    const cart=cartService.getCart()
    this.order.items=cart.items
    this.order.totalPrice=cart.totalPrice
  }

  ngOnInit(): void {
     let {name,address}=this.userService.currentUser 
     this.checkoutForm=this.formBuilder.group({
      name:[name,Validators.required],
      address:[address,Validators.required]
     })
  }

  get fc(){
    return this.checkoutForm.controls
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastrService.warning("please fill the inputs"," Invalid inputs")
      return
    }

    if(!this.order.addressLatLng){
      this.toastrService.warning("please select your location on map"," Invalid inputs")
      return
    }

    this.order.name=this.fc.name.value
    this.order.address=this.fc.address.value

    this.orderService.create(this.order).subscribe({
      next:()=>{
        this.router.navigateByUrl('/payment')
      },
      error:(errorResponse)=>{
        this.toastrService.error(errorResponse.error,'Cart')
      }
    })
    
  }
}
 */