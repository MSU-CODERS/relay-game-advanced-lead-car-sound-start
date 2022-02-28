function AvgDistance () {
    avg_distance = 0
    for (let index = 0; index < 5; index++) {
        avg_distance = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters) + avg_distance
    }
    avg_distance = avg_distance / 5
    return avg_distance
}
radio.onReceivedNumber(function (receivedNumber) {
    if (lead_cutebot != 1) {
        if (signal > receivedNumber) {
            lead_cutebot += 1
            cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x007fff)
            Line_Tracking()
            cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)
            cuteBot.stopcar()
            radio.sendString("Object Detected")
        } else {
            basic.showIcon(IconNames.No)
        }
    } else {
        basic.showIcon(IconNames.No)
    }
})
input.onSound(DetectedSound.Loud, function () {
    if (initialize == 1) {
        initialize += -1
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0x007fff)
        while (AvgDistance() >= 5) {
            if (cuteBot.tracking(cuteBot.TrackingState.L_unline_R_line)) {
                cuteBot.motors(60, 10)
            }
            if (cuteBot.tracking(cuteBot.TrackingState.L_line_R_unline)) {
                cuteBot.motors(10, 60)
            }
            if (cuteBot.tracking(cuteBot.TrackingState.L_R_line)) {
                cuteBot.motors(25, 25)
            }
            if (cuteBot.tracking(cuteBot.TrackingState.L_R_unline)) {
                cuteBot.motors(-25, -25)
            }
        }
        cuteBot.colorLight(cuteBot.RGBLights.ALL, 0xff0000)
        cuteBot.stopcar()
        radio.sendString("Object Detected")
    }
})
radio.onReceivedString(function (receivedString) {
    signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    for (let index = 0; index < 2; index++) {
        basic.showNumber(signal)
    }
    basic.pause(randint(100, 500))
    radio.sendNumber(signal)
})
function Line_Tracking () {
    while (AvgDistance() >= 5) {
        if (cuteBot.tracking(cuteBot.TrackingState.L_unline_R_line)) {
            cuteBot.motors(60, 10)
        }
        if (cuteBot.tracking(cuteBot.TrackingState.L_line_R_unline)) {
            cuteBot.motors(10, 60)
        }
        if (cuteBot.tracking(cuteBot.TrackingState.L_R_line)) {
            cuteBot.motors(25, 25)
        }
        if (cuteBot.tracking(cuteBot.TrackingState.L_R_unline)) {
            cuteBot.motors(-25, -25)
        }
    }
}
let signal = 0
let avg_distance = 0
let lead_cutebot = 0
let initialize = 0
initialize = 0
lead_cutebot = 0
radio.setGroup(1)
basic.forever(function () {
    if (input.buttonIsPressed(Button.A) || input.buttonIsPressed(Button.B)) {
        initialize = 1
        lead_cutebot += 1
        basic.showIcon(IconNames.Yes)
    }
})
