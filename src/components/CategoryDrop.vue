<template>
    <nav style="z-index: 1">
		<menu>
			<menuitem id="demo1">
				<a class="catSt">Categories</a>
				<menu>
                    <menuitem>
                        <a href="/courses/development">Development</a>
                        <menu>
                            <menuitem><a href="/courses/development/web-development">Web Development</a></menuitem>
                            <menuitem><a href="/courses/development/mobile-development">Mobile App</a></menuitem>
                            <menuitem><a href="/courses/development/programming-languages">Programming Language</a></menuitem>
                            <menuitem><a href="/courses/development/databases">Databases</a></menuitem>
                        </menu>  
                    </menuitem>
                    <menuitem>
                        <a href="/courses/business">Business</a>
                        <menu>
                            <menuitem><a href="/courses/business/finance">Finance</a></menuitem>
                            <menuitem><a href="/courses/business/management">Management</a></menuitem>
                            <menuitem><a href="/courses/business/strategy">Strategy</a></menuitem>
                            <menuitem><a href="/courses/business/project-management">Project Management</a></menuitem>
                        </menu>  
                    </menuitem>
                    <menuitem>
                        <a href="/courses/design">Design</a>
                        <menu>
                            <menuitem><a href="/courses/design/web-design">Web Design</a></menuitem>
                            <menuitem><a href="/courses/design/graphic-design">Graphic Design</a></menuitem>
                            <menuitem><a href="/courses/design/game-design">Game Design</a></menuitem>
                            <menuitem><a href="/courses/design/fashion">Fashion</a></menuitem>
                        </menu>  
                    </menuitem>
				</menu>
			</menuitem>
		</menu>
	</nav>
</template>

<script>
export default {
    
}
</script>

<style scoped>
nav menuitem {
   position:relative;
   display:block;
   opacity:0;
   cursor:pointer;
}

nav menuitem > menu {
   position: absolute;
   pointer-events:none;
}
nav > menu { display:flex; }

nav > menu > menuitem { pointer-events: all; opacity:1; }
menu menuitem a { white-space:nowrap; display:block; }
   
menuitem:hover > menu {
   pointer-events:initial;
}
menuitem:hover > menu > menuitem,
menu:hover > menuitem{
   opacity:1;
}
nav > menu > menuitem menuitem menu {
   transform:translateX(100%);
   top:0; right:0;
}
/* User Styles Below Not Required */
/* User Styles Below Not Required */
/* User Styles Below Not Required */

nav { 
   margin-top: 5px;
   /* margin-left: 20px; */
}


nav a {
   background:#0096a1;
   color:#FFF;
   min-width:190px;
   transition: background 0.5s, color 0.5s, transform 0.5s;
   margin:0px 6px 6px 0px;
   padding:15px 40px;
   box-sizing:border-box;
   border-radius:3px;
   box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
   position:relative;
   text-decoration: none;

}

.catSt {
   background: none;
   color:#FFF;
   min-width:190px;
   /* transition: background 0.5s, color 0.5s, transform 0.5s; */
   transition: none;
   margin:0px 6px 6px 0px;
   padding:15px 40px;
   box-sizing:border-box;
   border-radius:3px;
   /* box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.5); */
   box-shadow: none;
   position:relative;
   text-decoration: none;
   font-weight: bold;
}

.catSt:hover:before {
   position:absolute;
   background:rgba(0, 0, 0, 0.2);
   width:100%;
   height:100%;
   
}

nav a:hover:before {
   content: '';
   top:0;left:0;
   position:absolute;
   background:rgba(0, 0, 0, 0.2);
   width:100%;
   height:100%;
}

nav > menu > menuitem > a + menu:after{
   content: '';
   position:absolute;
   border:10px solid transparent;
   /* border-top: 10px solid white; */
   left:12px;
   top: -40px;  
}
nav menuitem > menu > menuitem > a + menu:after{ 
   content: '';
   position:absolute;
   border:10px solid transparent;
   /* border-left: 10px solid white; */
   top: 20px;
   left:-180px;
   transition: opacity 0.6, transform 0s;
}

nav > menu > menuitem > menu > menuitem{
   transition: transform 0.6s, opacity 0.6s;
   transform:translateY(150%);
   opacity:0;
}
nav > menu > menuitem:hover > menu > menuitem,
nav > menu > menuitem.hover > menu > menuitem{
   transform:translateY(0%);
   opacity: 1;
}

menuitem > menu > menuitem > menu > menuitem{
   transition: transform 0.6s, opacity 0.6s;
   transform:translateX(195px) translateY(0%);
   opacity: 0;
} 
menuitem > menu > menuitem:hover > menu > menuitem,  
menuitem > menu > menuitem.hover > menu > menuitem{  
   transform:translateX(0) translateY(0%);
   opacity: 1;
}

</style>