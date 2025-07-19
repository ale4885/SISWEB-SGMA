document.addEventListener('DOMContentLoaded', function () {
    var porcentajesAlumnos = [76, 67, 85];
    var conteoRealAlumnos = [120, 110, 140];

    var opcionesAlumnos = {
        series: porcentajesAlumnos,
        chart: {
            height: 250,
            type: 'radialBar',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            radialBar: {
                offsetY: 0,
                startAngle: -135,
                endAngle: 225,
                hollow: {
                    margin: 5,
                    size: '45%',
                    background: '#fff',
                    image: undefined,
                    imageOffsetX: 0,
                    imageOffsetY: 0,
                    position: 'front',
                    dropShadow: {
                        enabled: true,
                        top: 3,
                        left: 0,
                        blur: 4,
                        opacity: 0.24
                    }
                },
                track: {
                    background: '#fff',
                    strokeWidth: '97%',
                    margin: 5,
                    dropShadow: {
                        enabled: true,
                        top: -3,
                        left: 0,
                        blur: 4,
                        opacity: 0.35
                    }
                },
                dataLabels: {
                    show: true,
                    name: {
                        offsetY: -10,
                        show: true,
                        color: '#888',
                        fontSize: '17px'
                    },
                    value: {
                        formatter: function(valor, opciones) {
                            if (conteoRealAlumnos[opciones.seriesIndex] !== undefined) {
                                return conteoRealAlumnos[opciones.seriesIndex] + ' alumnos';
                            } else {
                                return 'Datos N/A';
                            }
                        },
                        offsetY: 8,
                        color: '#111',
                        fontSize: '30px',
                        show: true,
                    }
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#00E396', '#FEB019', '#775DD0'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: 'round'
        },
        labels: ['1er Año', '2do Año', '3er Año'],
    };

    var graficoAlumnos = new ApexCharts(document.querySelector("#grafico-alumnos"), opcionesAlumnos);
    graficoAlumnos.render();
});

document.addEventListener('DOMContentLoaded', function () {
    var datosGrafico = {
        finalizados: [
            { x: new Date('2024-06-01').getTime(), y: 10 },
            { x: new Date('2024-06-02').getTime(), y: 12 },
            { x: new Date('2024-06-03').getTime(), y: 15 },
            { x: new Date('2024-06-04').getTime(), y: 13 },
            { x: new Date('2024-06-05').getTime(), y: 18 },
            { x: new Date('2024-06-06').getTime(), y: 20 },
            { x: new Date('2024-06-07').getTime(), y: 22 },
            { x: new Date('2024-06-08').getTime(), y: 25 },
        ],
        enProceso: [
            { x: new Date('2024-06-01').getTime(), y: 5 },
            { x: new Date('2024-06-02').getTime(), y: 8 },
            { x: new Date('2024-06-03').getTime(), y: 7 },
            { x: new Date('2024-06-04').getTime(), y: 9 },
            { x: new Date('2024-06-05').getTime(), y: 11 },
            { x: new Date('2024-06-06').getTime(), y: 10 },
            { x: new Date('2024-06-07').getTime(), y: 13 },
            { x: new Date('2024-06-08').getTime(), y: 12 },
        ],
        rechazados: [
            { x: new Date('2024-06-01').getTime(), y: 2 },
            { x: new Date('2024-06-02').getTime(), y: 3 },
            { x: new Date('2024-06-03').getTime(), y: 1 },
            { x: new Date('2024-06-04').getTime(), y: 2 },
            { x: new Date('2024-06-05').getTime(), y: 4 },
            { x: new Date('2024-06-06').getTime(), y: 3 },
            { x: new Date('2024-06-07').getTime(), y: 2 },
            { x: new Date('2024-06-08').getTime(), y: 3 },
        ]
    };

    var opcionesAutos = {
        series: [{
            name: 'Finalizados',
            data: datosGrafico.finalizados
        }, {
            name: 'En Proceso',
            data: datosGrafico.enProceso
        }, {
            name: 'Rechazados',
            data: datosGrafico.rechazados
        }],
        chart: {
            height: 350,
            type: 'area',
            zoom: {
                enabled: false
            },
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        xaxis: {
            type: 'datetime',
            labels: {
                formatter: function(valor) {
                    const fecha = new Date(valor);
                    return fecha.toLocaleString('es-ES', { month: 'short', day: 'numeric' });
                }
            },
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
            title: {
                text: 'Cantidad de Autos',
                style: {
                    color: '#555',
                    fontSize: '14px',
                    fontWeight: 600,
                }
            },
            labels: {
                formatter: function (valor) {
                    return Math.round(valor);
                }
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            },
            y: {
                formatter: function (valor) {
                    return valor + " autos";
                }
            }
        },
        colors: ['#00E396', '#FEB019', '#FF4560'],
        grid: {
            borderColor: '#e0e0e0',
            strokeDashArray: 4,
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'right',
            floating: false,
            offsetY: -25,
            offsetX: -5,
            fontSize: '14px',
            fontFamily: 'Roboto, Arial',
            fontWeight: 500,
            labels: {
                colors: '#333',
            },
            markers: {
                width: 12,
                height: 12,
                radius: 4,
            },
            itemMargin: {
                horizontal: 10,
                vertical: 0
            },
        },
    };

    var graficoAutos = new ApexCharts(document.querySelector("#grafico-autos-registrados"), opcionesAutos);
    graficoAutos.render();
});