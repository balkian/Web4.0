Web40Hook = require('hook.io-web40').Web40Hook

stdin = process.openStdin();
stdin.on 'data', (chunk) ->
    killHook(chunk)

killHook = (data)->
    hook.emit('kill',otherhooks[parseInt(data)], (res)->
        console.log('Killed the hook '+data)
        otherhooks.splice(parseInt(data),1))

hook = new Web40Hook { name : 'hookManager' , silent : true}


otherhooks = []

hook.on '*::ready', ->
    console.log 'listo'

redraw = ->
    process.stdout.write '\u001B[2J\u001B[0;0f'
    process.stdout.write 'Hooks:\n'
    for name,i in otherhooks
        process.stdout.write '['+i+']: '+name+'\n'

refresh = ->
    otherhooks = []
    hook.emit 'ping', null, (name)->
        console.log('Reply by'+name)
    setTimeout refresh, 2000

#//'\u001B[2J\u001B[0;0f'

hook.on '*::pong', (data,fn) ->
    console.log data.name+' replied'
    if !(data.name in otherhooks)
        otherhooks.push data.name
        redraw()

hook.connect()
refresh()
