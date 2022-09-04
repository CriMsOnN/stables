BoxZones = {}

function BoxZones.Create(name, vectors, length, width, options)
    name = name:lower()

    if BoxZones[name] == nil then
        BoxZones[name] = BoxZone:Create(vectors, length, width, options)
        BoxZones[name]:onPlayerInOut(function(isInside)
            SendEvent(isInside, options)
        end)
    else
        BoxZones[name]:destroy()
        BoxZones[name] = nil
        BoxZones.Create(name, vectoros, length, width, options)
    end
end

AddEventHandler('addBoxZone', function(name, options)
    local vecs = vector3(options.x, options.y, options.z)
    BoxZones.Create(name, vecs, options.length, options.width, options.options)
end)


function SendEvent(inside, options)
    if options?.type ~= nil then
        if options.type == 'client' then
            TriggerEvent(options.event, inside, options.name, options.args)
        elseif options.type == 'server' then
            TriggerServerEvent(options.event, inside, options.name, options.args)
        end
    end
end