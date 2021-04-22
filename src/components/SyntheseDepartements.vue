<template>
    <!-- Content -->
    <div class="card mt-5" v-if="statistics && !loading && show">
        <div v-on:click="showData()" class="card-header"><h2 class="float-left">Synthèse par départements</h2><h2 class="float-right">⬇</h2></div>
        <div class="card-body table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Département</th>
                    <th scope="col">Hospitalisations</th>
                    <th scope="col">Réanimations</th>
                    <th scope="col">Nouvelles Hospitalisations</th>
                    <th scope="col">Nouvelles Réanimations</th>
                    <th scope="col">Décès</th>
                    <th scope="col">Guerisons</th>
                </tr>
                </thead>
                <tbody v-for="stats of statistics">
                <tr v-if="stats.code.substring(0,3) === 'DEP'">
                    <th scope="row">{{stats.code.replace("DEP-","")}}</th>
                    <td>{{stats.nom}}</td>
                    <td>{{stats.hospitalises}}</td>
                    <td>{{stats.reanimation}}</td>
                    <td>{{stats.nouvellesHospitalisations}}</td>
                    <td>{{stats.nouvellesReanimations}}</td>
                    <td>{{stats.deces}}</td>
                    <td>{{stats.gueris}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <a v-on:click="showData()" class="card-footer text-muted text-center">Mis à jour le {{statistics[0].date}} par {{statistics[0].sourceType}}⬆</a>
    </div>

    <!-- Loading content-->
    <div class="card text-center mt-5" v-else-if="loading">
        <div class="card-header"><h2>Synthèse par départements</h2></div>
        <div class="card-body">
            <div class="spinner-border" style="width: 10rem; height: 10rem;" role="status">
                <span class="sr-only"><strong>Loading...</strong></span>
            </div>
        </div>
        <div class="card-footer text-muted"><strong>Loading...</strong></div>
    </div>

    <!-- Hide content-->
    <div class="card text-center mt-5" v-else-if="!loading && !show">
        <div v-on:click="showData()" class="card-header"><h2 class="float-left">Synthèse par départements</h2><h2 class="float-right">⬆</h2></div>
    </div>


</template>

<script>
    export default {
        name: "SyntheseDepartements",
        props:{
            //statistics contains all data
            statistics: { type: Array},
            //loading state
            loading: true,
        },
        data() {
            return{
                //boolean to hide content
                show: false,
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

