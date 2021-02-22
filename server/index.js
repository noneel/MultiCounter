const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

var counters = [];

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Initialize all counters with current list on connection
    io.emit("currentCounters", counters);

    socket.on("reqNewTimer", (data) => {
        var date = new Date(data.value).valueOf();
        if(isNaN(date)) {
            io.to(socket.id).emit("ValidTimer", false);
            return;
        } else {
            io.to(socket.id).emit("ValidTimer", true);
        }
        console.log(`Creating new timer for: ${data.value} (${date})`);

        // TODO: If valid UTC time

        var idVal = new Date().valueOf();
        var newData = {
            id: idVal,
            value: date,
            title: data.title
        };
        counters.push(newData);
        io.emit("TimerCreated", newData);
    });

    socket.on("reqDeleteTimer", (counterId) => {
        console.log(`Deleting: ${counterId}`);

        // TODO: Validate removal?
        counters = counters.filter(c => c.id !== counterId);
        io.emit("TimerDeleted", counterId);
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );

var interval = setInterval(function() {
    // Check if any timers have expired
    const currentDate = new Date().valueOf();

    for(let item of counters) {
        if(item.value <= currentDate) {
            // Timer has expired.
            console.log(`Timer Completed: ${item.value} Current Time: ${currentDate}`)
            io.emit("TimerCompleted", item.id);

            // Remove the counter from list
            counters = counters.filter(c => c.id !== item.id);
        }
    }

}, 1000);