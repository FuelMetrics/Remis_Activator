<template>
    <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>
<script>


export default {
    name: 'spinner',
    data() {
        return {

        }
    }
}
</script>

<style lang="scss">
.btn {
    span.wait {
        padding-right: 20px;
        position: relative;
        display: block;
        width: 100px;

        .lds-ring {
            display: inline-block;
            position: absolute;
            width: 20px;
            height: 20px;
            right: -5px;
            top: 2px;

            div {
                box-sizing: border-box;
                display: block;
                position: absolute;
                width: 16px;
                height: 16px;
                margin: 2px;
                border: 3px solid #fff;
                border-radius: 50%;
                animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
                border-color: #fff transparent transparent transparent;

                &:nth-child(1) {
                    animation-delay: -0.45s;
                }

                &:nth-child(2) {
                    animation-delay: -0.3s;
                }

                &:nth-child(3) {
                    animation-delay: -0.15s;
                }
            }
        }
    }
}


@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>