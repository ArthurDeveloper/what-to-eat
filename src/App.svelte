<script>
	import { onMount } from 'svelte';
	import Meal from './components/Meal.svelte';
	import LoadingAnimation from './components/LoadingAnimation.svelte';

	let meals;

	let mealData = {};
	let mealBeingShown = false;

	async function getMeals() {
		let requests = [
			fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
			fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
			fetch('https://www.themealdb.com/api/json/v1/1/random.php'),
			fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		];

		const data = await Promise.all(requests).then(values => {
			return Promise.all(values.map(value => {
				return value.json();
			}));
		}).then(data => {
			const dataMeals = data.map(value => {
				return value.meals[0];
			});

			localStorage.setItem('meals', JSON.stringify(dataMeals));
			return dataMeals;
		});

		return data;
	}

	onMount(async () => {
		const cachedMeals = (() => {
			try {
				const parsed = JSON.parse(localStorage.getItem('meals'));
				return parsed;
			} catch (e) {
				return null;
			}
		})();
		
		meals = cachedMeals ?? await getMeals();
	});

	function seeMealData(meal) {
		mealBeingShown = true;
		mealData = meal;
	}
</script>

<main>
	<div class="flex flex-col items-center bg-gradient-to-r from-orange-400 to-orange-600 min-h-screen">
		<h1 class="text-center text-white text-5xl mt-8 mb-16">What to eat today?</h1>

		<div class="flex flex-wrap justify-center gap-8 w-4/5">
			{#if meals}
				{#each meals as meal}
					<div class="flex flex-col bg-white w-48 mb-16 p-3 rounded">
						<img src={meal.strMealThumb} alt={meal.strMeal} class="rounded" />
						<h3 class="text-xl">{
							meal.strMeal.length > 15 ?
								meal.strMeal.substring(0, 15)+'...' :
								meal.strMeal
						}</h3>

						<button
							class="mt-auto self-start bg-orange-500 text-white p-2 rounded"
							on:click={() => seeMealData(meal)}
						>
							See more
						</button>
					</div>
				{/each}
			{:else}
				<LoadingAnimation />
			{/if}
		</div>

		{#if mealBeingShown}
			<Meal mealData={{ 
				name: mealData.strMeal,
				// Putting all the ingredients in an array through a kinda hacky way
				// since the guy who made the api probably doesn't know what an array is
				ingredients: Object.keys(mealData).map(key => {
					if (key.startsWith('strIngredient')) {
						return mealData[key];
					}
				}).filter(ingredient => ingredient === null || ingredient === undefined ? false : true),
				instructions: mealData.strInstructions,
				image: mealData.strMealThumb 
			}} />
		{/if}

		<footer class="flex justify-center mt-8 mb-1">
			<span class="text-white">Not what you're looking for? 
				<button class="underline" on:click={async () => {
					meals = null;
					mealData = {};
					mealBeingShown = false;
					meals = await getMeals();
				}}>
					See more foods
				</button>
			</span>
		</footer>
	</div>
</main>

<style>

</style>