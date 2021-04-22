<template>
    <div class="card text-center mt-5" v-if="statistics && !loading && show">
        <div v-on:click="showData()" class="card-header"><h2 class="float-left">Synthèse France</h2><h2 class="float-right">⬇</h2></div>
        <div class="card-body" v-for="stats of statistics" v-if="stats.code.substring(0,3) === 'FRA'">
            <ul class="list-group list-group-flush" >
                <li class="list-group-item">Hospitalises : {{stats.hospitalises}}</li>
                <li class="list-group-item">Reanimation : {{stats.reanimation}}</li>
                <li class="list-group-item">Nouvelles Hospitalisations : {{stats.nouvellesHospitalisations}}</li>
                <li class="list-group-item">Nouvelles Reanimations : {{stats.nouvellesReanimations}}</li>
                <li class="list-group-item">Deces : {{stats.deces}}</li>
                <li class="list-group-item">Gueris : {{stats.gueris}}</li>
            </ul>
        </div>
        <a class="card-footer text-muted">Mis à jour le {{statistics[0].date}} par {{statistics[0].sourceType}}</a>
    </div>

    <div class="card text-center mt-5" v-else-if="loading">
        <div class="card-header"><h2>Synthèse covid FRANCE</h2></div>
        <div class="card-body">
            <div class="spinner-border" style="width: 10rem; height: 10rem;" role="status">
                <span class="sr-only"><strong>Loading...</strong></span>
            </div>
        </div>
        <div class="card-footer text-muted"><strong>Loading...</strong></div>
    </div>

    <div class="card text-center mt-5" v-else-if="!loading && !show">
        <div v-on:click="showData()" class="card-header"><h2 class="float-left">Synthèse France</h2><h2 class="float-right">⬆</h2></div>
    </div>


</template>

<script>

    export default {
        name: "statsFR",
        props:{
            //statistics contains all data
            statistics: {type: Array},
            //loading state
            loading: true,
        },
        data() {
            return{
                //boolean to hide content
                show: true,
            }
        },
        methods: {
            //method to hide content
            showData: function () {
                this.show = !this.show;
            },
        },
    };
</script>
