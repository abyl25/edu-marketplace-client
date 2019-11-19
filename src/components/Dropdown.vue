<!--<template>-->
<!--    <div>-->
<!--        <button @click='toggleShow' class='anchor'>Dropdown</button>-->
<!--        <div v-if='showMenu' class='menu'>-->
<!--            <div class='menu-item' v-for='item in this.items' @click='itemClicked(item)'>{{item}}</div>-->
<!--        </div>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--    export default {-->
<!--        name: "Dropdown",-->
<!--        props: {},-->
<!--        data() {-->
<!--            return {-->
<!--                showMenu: false,-->
<!--                activeInstrument: 'Piano',-->
<!--                instruments: [-->
<!--                    'Piano',-->
<!--                    'Acoustic Guitar',-->
<!--                    'Drums',-->
<!--                    'Trumpet'-->
<!--                ]-->
<!--            }-->
<!--        },-->
<!--        methods: {-->
<!--            toggleShow() {-->
<!--                this.showMenu = !this.showMenu;-->
<!--            },-->
<!--            itemClicked(item) {-->
<!--                this.toggleShow();-->
<!--                this.changeInstrument(item);-->
<!--            },-->
<!--            changeInstrument(instrument) {-->
<!--                this.activeInstrument = instrument;-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->
<!--    .anchor {-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        justify-content: center;-->
<!--        border: 1px solid transparent;-->
<!--        padding: .75rem 2rem;-->
<!--        font-size: 1rem;-->
<!--        border-radius: .25rem;-->
<!--        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;-->
<!--        color: #fff;-->
<!--        background-color: #27AE60;-->
<!--        border-color: #27AE60;-->
<!--    }-->

<!--    .anchor::after {-->
<!--        display: inline-block;-->
<!--        width: 0;-->
<!--        height: 0;-->
<!--        margin-left: .5em;-->
<!--        vertical-align: .255em;-->
<!--        content: "";-->
<!--        border-top: .3em solid;-->
<!--        border-right: .28em solid transparent;-->
<!--        border-bottom: 0;-->
<!--        border-left: .28em solid transparent;-->
<!--    }-->

<!--    .anchor:hover {-->
<!--        color: #fff;-->
<!--        background-color: #229954;-->
<!--        border-color: #229954;-->
<!--        cursor: pointer;-->
<!--    }-->

<!--    .menu {-->
<!--        background-color: #fff;-->
<!--        background-clip: padding-box;-->
<!--        border: 1px solid rgba(0,0,0,.15);-->
<!--        border-radius: .25rem;-->
<!--        color: #212529;-->
<!--        cursor: pointer;-->
<!--        display: flex;-->
<!--        flex-direction: column;-->
<!--        font-size: 1rem;-->
<!--        list-style: none;-->
<!--        margin: .125rem 0 0;-->
<!--        padding: .5rem 0;-->
<!--        position: absolute;-->
<!--        text-align: left;-->
<!--    }-->

<!--    .menu-item {-->
<!--        color: #212529;-->
<!--        padding: .25rem 1.5rem;-->
<!--        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;-->
<!--    }-->

<!--    .menu-item:hover {-->
<!--        background-color: #F4F6F6;-->
<!--        cursor: pointer;-->
<!--    }-->

<!--    span {-->
<!--        font-weight: bold;-->
<!--        color: #229954;-->
<!--        font-size: 1.25rem;-->
<!--    }-->

<!--</style>-->