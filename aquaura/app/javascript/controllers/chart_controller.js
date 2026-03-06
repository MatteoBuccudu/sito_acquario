import { Controller } from "@hotwired/stimulus"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

// Connects to data-controller="chart"
export default class extends Controller {
    static values = {
        labels: Array,
        ph: Array,
        no3: Array
    }

    connect() {
        const ctx = this.element.getContext('2d')

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.labelsValue,
                datasets: [
                    {
                        label: 'pH',
                        data: this.phValue,
                        borderColor: '#0ea5e9', // primary
                        backgroundColor: 'rgba(14, 165, 233, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'NO3 (mg/l)',
                        data: this.no3Value,
                        borderColor: '#f59e0b', // accent
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#94a3b8' // text-slate-400
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#94a3b8' }
                    },
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: { color: '#0ea5e9' } // primary per pH
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        grid: { drawOnChartArea: false }, // evito doppia griglia
                        ticks: { color: '#f59e0b' } // accent per NO3
                    }
                }
            }
        })
    }

    disconnect() {
        if (this.chart) {
            this.chart.destroy()
        }
    }
}
