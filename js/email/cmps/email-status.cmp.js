'use script'

export default {
    props: ['status'],
    template: `
        <section class="status-container">
        <h1>{{numOfReading()}} is reading</h1>
            <div class="status" :style="{width: getStatus()}">
            </div>
        </section>
    `,
    methods: {
        numOfReading() {
            var num = this.getStatus();
            num = Math.floor(parseInt(num))
            return num + '%';
        },
        getStatus() {
            return this.status * 100 + '%';
        }
    }
}