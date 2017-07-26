# Nathan's HTTP Server

This is a simple HTTP server which can display a cow saying a custom message. There are two ways to communicate with the server, a GET request or a POST request. 

## GET
```
/help

/[cowsay?text='<message>'[&cow='<cow>']]
```

## POST

URL
```
/cowsay
```

Body
```js
{
  "text": "<message>",
  "cow": "<cow>"
}

```

## Cows
* beavis.zen
* bong
* bud-frogs
* bunny
* cheese
* cower
* daemon
* default
* doge
* dragon-and-cow
* dragon
* elephant-in-snake
* elephant
* eyes
* flaming-sheep
* ghostbusters
* goat
* head-in
* hedgehog
* hellokitty
* kiss
* kitty
* koala
* kosh
* luke-koala
* mech-and-cow
* meow
* milk
* moofasa
* moose
* mutilated
* ren
* satanic
* sheep
* skeleton
* small
* sodomized
* squirrel
* stegosaurus
* stimpy
* supermilker
* surgery
* telebears
* turkey
* turtle
* tux
* vader-koala
* vader
* whale
* www
