Vue.component('product',{
	props:{
		premium:{
			type:Boolean,
			required: true
		}
	},
	template:
	`
	<div class="product">
		<div class="product-image">
			<img :src="image">
		</div>
		<div class="info">
				<h1>{{title}}</h1>
				<p v-if="inventory>10" >InStock</p>
				<p v-else-if="inventory<=10 && inventory>0"
					>outOfStockSoon</p>
				<p v-else="inventory<0"
					:class="{outOfStock:!inventory}">outOfStock</p>
					<p>Shipping {{shipping}}</p>

			<div>
				<ul >
					<li v-for="detail in details">{{detail}}</li>
				</ul>
					<div class="color-box"
						 v-for="(variant , index) in variants" 
						:key="variant.variantId"
						:style="{backgroundColor:variant.variantColor}"
						 @mouseover="updateProduct(index)">
						
					
					
					</div>
				<ul>
					<li v-for="size in sizes">{{size}}</li>
				</ul>
			</div>
			
			<P>{{description}}</P>
			<button  v-on:click="addToCart"
					 :disabled="!inventory"
					 :class="{disabledButton:!inventory}">add cart</button>
			
			<button  v-on:click="decrementToCart"
					 :disabled="!inventory"
					 :class="{disabledButton:!inventory}">Remove cart</button>
		</div>

	</div>
	`,
	data(){
			return {
		
		product:'socks',
		brand:'alishan',
		description:'A pair of warm, fuzzy socks',
		selectedVariant : 0,
		link:'https://vuejs.org/v2/guide/installation.html',
		details:['80% cotton','polyster','gender-netural'],
		// inventory:0,
		variants:[
		{
			variantId:20,
			variantColor:"blue",
			variantImage:'image/blue-onWhite.jpg',
			variantQuantity:0
		},
		{
			variantId:10,
			variantColor:"green",
			variantImage:'image/green_sockes.jpg',
			variantQuantity:15
		}
		],
		sizes:[6,7,8,9],

	
		}
	},
	methods:{
		addToCart(){
			this.$emit('add-to-cart')
		},
		decrementToCart(){
			this.$emit('remove-from-cart')
		},

		updateProduct(index){
			this.selectedVariant = index,
			console.log(index)
		}
	},
	computed:{
		title(){
			return this.brand + ' ' + this.product
		},
		image(){
			return this.variants[this.selectedVariant].variantImage
		},
		inventory(){
			return this.variants[this.selectedVariant].variantQuantity
		},
		shipping(){
			if(this.premium){
				return "Free"
			}
			else{
				return 2.99
			}
		}

	}
})

var app = new Vue({
	el:'#app',
	data:{
		premium :false,
		cart:[]
	},
	methods:{
		updateCart(id){
			this.cart.push(id)
		},
		removeItem(id){
			for(var i = this.cart.length - 1; i >= 0; i--) {
            if (this.cart[i] === id) {
               this.cart.splice(i, 1);
            }
          }
		}
	}
	
})