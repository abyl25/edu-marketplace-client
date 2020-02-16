<template>
    <div class="dropdown" v-click-outside="onClickOutside">
        <!--  @click="toggleShow"  -->
        <button class="anchor" @click="toggleShow" >{{ name }}  <!--  @mouseover="showMenu=true"  -->
            <img src="../../assets/chevron-down.png" alt="" class="arrow" :class="{'arrow--rotate': showMenu}">
        </button>
        <div v-if="showMenu" class="menu"  > <!-- @mouseleave="showMenu=false" -->
            <p class="menu-item" v-for="item in this.items" @click="itemClicked(item)">{{ item.text }}</p>
<!--            <router-link class="menu-item" v-for="item in this.items">{{ item.text }}</router-link>-->
        </div>
<!--        <transition name="fade"></transition>-->
    </div>
</template>

<script>
    export default {
        props: {
            name: String,
            items: Array,
            onClick: Function,
        },
        name: "Dropdown",
        data() {
            return {
                showMenu: false,
                vcoConfig: {
                    handler: this.handler,
                    middleware: this.middleware,
                    events: ['dblclick', 'click'],
                    isActive: true
                }
            }
        },
        methods: {
            toggleShow() {
                this.showMenu = !this.showMenu;
            },
            itemClicked(item) {
                // console.log('item clicked');
                this.showMenu = false;
                this.onClick(item);
            },
            onClickOutside (event, el) {
                // console.log('Clicked outside.');
                this.showMenu = false;
            },
            handler (event, el) {
                console.log('Clicked outside (Using config), middleware returned true :)');
            },
            middleware (event, el) {
                return event.target.className !== 'modal';
            }
        }
    }
</script>

<style scoped>
    /* Transitions */
    .fade-enter-active, .fade-leave-active {
        transition: opacity ease .3s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }

    .arrow {
        max-height: 5px;
        margin-left: 8px;
        transition: transform 0.2s ease-in-out;
    }
    .arrow--rotate {
        transform: rotate(180deg);
    }

    .dropdown {
        position:relative;
    }

    .anchor {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #27AE60;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 4px;
        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        color: #fff;
        background-color: #27AE60;
        user-select: none;
    }
    .anchor:hover {
        color: #fff;
        background-color: #229954;
        border-color: #229954;
        cursor: pointer;
    }

    .menu {
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 150px;
        /*left: -15%;*/
        right: 0;
        margin: .125rem 0 0;
        padding: .5rem 0;
        border: 1px solid #dce8e6; /*  rgba(0,0,0,.15)  */
        border-radius: .25rem;
        background-color: #fff;
        background-clip: padding-box;
        box-shadow: 0 10px 15px 0 rgba(0, 0, 0, 0.1);
        color: #212529;
        font-size: 1rem;
        list-style: none;
        text-align: left;
        z-index: 10;
        user-select: none;
    }

    .menu::before {
        content: " ";
        position: absolute;
        top: -18px;
        left: 50%;
        margin-left: -5px;
        border-width: 9px;
        border-style: solid;
        border-color: transparent transparent #fff transparent; /* #a3c2bd  */
        outline: none;
    }

    .menu-item {
        border-left: 2px solid transparent;
        color: #212529;
        padding: 10px 15px;
        transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }

    .menu-item:hover {
        border-left: 2px solid #2c8af5;
        background-color: #F4F6F6;
        cursor: pointer;
    }

    span {
        font-weight: bold;
        color: #229954;
        font-size: 1.25rem;
    }

</style>
