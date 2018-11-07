'use script'

export default {
    props: ['status'],
    template: `
        <section class="status-container">
            <div class="status" :style="{width: getStatus()}">
            </div>
        </section>
    `,
    methods: {
        getStatus() {
            return this.status * 100 + '%';
        }
    }
}