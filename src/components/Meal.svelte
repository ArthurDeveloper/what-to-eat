<script>
    import { afterUpdate } from 'svelte';

    afterUpdate(() => {
        document.querySelector('#meal').scrollIntoView({
		    behavior: 'smooth'
	    });
    });

    export let mealData = {};

    function titleCase(str) {
        return str.split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }
</script>

<div class="bg-white rounded lg:w-1/2 md:w-4/6 sm:w-5/6 animate-fade-in" id="meal">
    <div class="flex flex-col h-1/2 max-h-1/2 p-3">
        <div class="flex flex-col">
            <img src={mealData.image} alt={mealData.name} class="rounded w-auto h-auto" />
            <h2 class="text-4xl mb-6 mt-3">{mealData.name}</h2>
        </div>
        <div class="flex flex-col mb-8">
            <h3 class="text-xl mb-4">Ingredients</h3>
            <ul>
                {#each mealData.ingredients as ingredient}
                    <li>{titleCase(ingredient)}</li>
                {/each}
            </ul>
        </div>
        <div class="flex flex-col overflow-y-auto">
            <h3 class="text-xl mb-4">Instructions</h3>
            <div>
                {@html mealData.instructions.replace(/\r\n/g, "<br>")}
            </div>
        </div>
    </div>
</div>
