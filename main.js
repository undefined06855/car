const canvas = document.querySelector("canvas")
    , ctx = canvas.getContext("2d")

    , image = {
        image: -1,
        width: 48,
        height: 48
    }

var keys = {
    "ArrowLeft": false,
    "ArrowRight": false
}


class Car
{
    constructor()
    {
        this.angle = 0
        this.rad = 0

        this.x = 0
        this.y = 0
    }
    update()
    {
        if (keys.ArrowLeft) this.angle--
        if (keys.ArrowRight) this.angle++

        this.rad = this.angle * (Math.PI/180) * 2

        this.x += Math.cos(this.rad) * 3
        this.y += Math.sin(this.rad) * 3

        if (this.x > canvas.width) this.x = canvas.width
        if (this.x < 0           ) this.x = 0
        if (this.y > canvas.width) this.y = canvas.width
        if (this.y < 0           ) this.y = 0
    }
    draw()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.translate(this.x, this.y)
        ctx.rotate(this.rad + Math.PI*2)
        ctx.drawImage(image.image, -image.width / 2, -image.height / 2, image.width, image.height)
        ctx.rotate(-(this.rad + Math.PI*2))
        ctx.translate(-this.x, -this.y)
    }
    frame()
    {
        car.update()
        car.draw()
        requestAnimationFrame(car.frame)
    }
}

const car = new Car

document.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft")  keys.ArrowLeft = true
    if (event.key === "ArrowRight") keys.ArrowRight = true
})

document.addEventListener("keyup", event => {
    if (event.key === "ArrowLeft")  keys.ArrowLeft = false
    if (event.key === "ArrowRight") keys.ArrowRight = false
})

image.image = new Image()
image.image.src = "./car.png"
image.image.onload = () => {
    requestAnimationFrame(car.frame)
}