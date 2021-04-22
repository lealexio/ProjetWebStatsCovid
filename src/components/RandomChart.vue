<template>
    <div class="small">
        <line-chart :chart-data="datacollection"></line-chart>
    </div>
</template>

<script>
    import LineChart from './LineChart.js'

    export default {
        components: {
            LineChart
        },
        props:{
            //original data
            statistics: { type: Array},
        },
        data () {
            return {
                //Data for graph
                datacollection: []
            }
        },
        mounted () {
            this.fillData()
        },
        methods: {
            fillData () {
                //labels
                var labeltest = [];
                //hospitalises
                var data1 = [];
                //reanimation
                var data2 = [];
                for(var i=0; i<this.statistics.length; i++){
                    labeltest.push(this.statistics[i].date)
                    data1.push(this.statistics[i].hospitalises)
                    data2.push(this.statistics[i].reanimation)
                }

                this.datacollection = {
                    labels: [] = labeltest,
                    datasets: [
                        {
                            label: 'Hospitalisations',
                            fill: false,
                            borderColor: '#D3634B',
                            backgroundColor: '#D3634B',
                            data: [] = data1
                        }, {
                            label: 'Réanimations',
                            fill: false,
                            borderColor: '#AAD35C',
                            backgroundColor: '#AAD35C',
                            data: [] = data2
                        }
                    ]
                }
            },
        }
    }
</script>

<style>
</style>
