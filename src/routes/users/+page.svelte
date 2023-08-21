
<script lang="ts">
	import { onMount } from "svelte";

    type User={
        id:number,
        name:string,
        age:number,
        createdAt:string
    }

    let userData:any[]=[];

    onMount(async ()=>{

       let res=await  fetch('/api/users');
        userData=(await res.json()).payload
        
    })


</script>



<div>
    this is users list

    {#each userData as user}
            <h1>{user.name}</h1>
            <h2>{user.age}</h2>

    {/each}

</div>


