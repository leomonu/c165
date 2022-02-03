AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //get all enemies using className
        var els = document.querySelectorAll(".enemy");
        console.log(els)
        for (var i = 0; i < els.length; i++) {

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);
            // position1 - enemy position2 - player
            //Three.js Vector Variables
            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()
            

            //Get enemey and player position using Three.js methods
                var enemy = els[i].object3D
                var player = document.querySelector("#weapon").object3D
            

            //set the velocity and it's direction
            player.getWorldPosition(position2)
            enemy.getWorldPosition(position1)
            var direction = new THREE.Vector3()
            // subvector is used to get the direction of 2 players by subtracting 2 vector positions
            direction.subVectors(position1,position2).normalize()
            // .normalise is used to get the unit length of the given vector
            enemyBullet.setAttribute("velocity",direction.multiplyScalar(-10))
            //Set dynamic-body attribute
            enemyBullet.setAttribute("dynamic-body",{
                shape:"sphere",
                mass:0
            })


            

            //Get text attribute
            var element = document.querySelector("#countLife")
            var playerLife = parseInt(element.getAttribute("text").value)
            

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Add the conditions here
                    if (playerLife>0){
                        playerLife-=1
                        element.setAttribute("text",{
                            value:playerLife
                        })
                    }
                    if(playerLife<=0){
                        var text = document.querySelector("#over")
                        text.setAttribute(
                            "visible",true)
                            
                    }

                    var tank = document.querySelectorAll(".enemy")
                            for(var i = 0;i<tank.length;i++){
                            scene.removeChild(tank[i])
                            if(scene.removeChild(tank[i])){
                                var element1 = document.querySelector("#countTank")

                                var counterTank = parseInt(element1.getAttribute("text").value)
                                counterTank-=1
                                element1.setAttribute("text",{
                                    value:counterTank
                                })
                            }
                            
                        
                    }   
                    



                }
            });

        }
    },

});