class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        //this.engine.show(this.engine.storyData.InitialLocation);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location,this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        //this.engine.show(this.engine.storyData.Day);
        if(locationData.Choices) { // TODO: check if the location has any Choices
            if(this.engine.storyData.Day == "2"){
                if(locationData.Choices2){
                    for(let choice2 of locationData.Choices2) {
                        this.engine.addChoice(choice2.Text, choice2);
                    }
                }
            }
            if(locationData.Choices){
                for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                    this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                    //if(choice.Target == "Room"){this.engine.storyData.Day = "2";}
                    // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                }

            }
        } else {
            this.engine.addChoice("The end.");
        }
        if(locationData.keys) {
            for(let items of locationData.keys){
                this.engine.addChoicek(items.Item, items);
            }
        }
    }
    handleChoice(choice2) {
        if(choice2) {
            this.engine.show("&gt; "+choice2.Text);
            this.engine.gotoScene(Location, choice2.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
    handlekeys(items) {
        if(items) {
            this.engine.show(items.Item);
            this.engine.show(items.message);
            this.engine.storyData.Day = "2";
            this.engine.gotoScene(Location, "playground");

        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');