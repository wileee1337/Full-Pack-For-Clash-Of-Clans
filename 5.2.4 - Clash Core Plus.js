const base = Module.findBaseAddress("libg.so");
const BattleSimulationManagerIsEnabledPtr = 0x1571E4;
const BattleSimulationManagerIsEnabled = base.add(BattleSimulationManagerIsEnabledPtr);

function BattleSimulationManagerisEnabled() {
    BattleSimulationManagerIsEnabled.writeU8(1);
}

function init() {
    toast("Баттле симулейшен он 5.2.4 с коннектом\nБу МЕМозки");
    connect();
}

function toast(text) {	
    Java.perform(function() {
        Java.scheduleOnMainThread(function() {
                Java.use("android.widget.Toast").makeText(Java.use('android.app.ActivityThread').currentApplication().getApplicationContext(), Java.use("java.lang.String").$new(text), 1).show();
        });
    });
}

function connect() {
    Interceptor.attach(Module.findExportByName("libc.so", "getaddrinfo"), { 
        onEnter(args) { 
            args[0].writeUtf8String("127.0.0.1");
        } 
    });
}

rpc.exports.init = init;