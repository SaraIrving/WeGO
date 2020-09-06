INSERT INTO users (name, avatar, city, password, email)
VALUES ('Sylvia Palmer', 'https://www.spacercreative.com/wp-content/uploads/2020/09/001-running.png', 'Calgary', '123', 'email@email.com'),
('Tori Malcolm', 'https://www.spacercreative.com/wp-content/uploads/2020/09/017-compass.png', 'Calgary', '123', 'email@email.com'),
('Mildred Nazir', 'https://www.spacercreative.com/wp-content/uploads/2020/09/029-fishing.png', 'Calgary', '123', 'email@email.com'),
('Cohana Roy', 'https://www.spacercreative.com/wp-content/uploads/2020/09/030-backpack.png', 'Calgary', '123', 'email@email.com'),
('Sven Jones', 'https://www.spacercreative.com/wp-content/uploads/2020/09/035-volleyball.png', 'Calgary', '123', 'email@email.com'),
('Susan Reynolds', 'https://www.spacercreative.com/wp-content/uploads/2020/09/034-racket.png', 'Calgary', '123', 'email@email.com'),
('Alec Quon', 'https://www.spacercreative.com/wp-content/uploads/2020/09/032-kayak.png', 'Calgary', '123', 'email@email.com'),
('Hanna Oo', 'https://www.spacercreative.com/wp-content/uploads/2020/09/014-golf.png', 'Vancouver', '123', 'email@email.com'),
('Nat Yo', 'https://www.spacercreative.com/wp-content/uploads/2020/09/014-golf.png', 'Vancouver', '123', 'email@email.com'),
('Caroline Bo', 'https://www.spacercreative.com/wp-content/uploads/2020/09/014-golf.png', 'Vancouver', '123', 'email@email.com');


INSERT INTO activities (name, num_of_participants, frequency, days_available, timeframe, location, skill_tag, description)
VALUES ('Evening Spikeball', 4, 'weekly', 'thursday tuesday', 'evening', 'Stanley Park', 'advanced', 'Come join us on a weekly basis for some insanely intense spikeball in the park!'),
('Bocce Ball', 6, 'weekly', 'wednesday', 'morning', 'My backyard', 'intermediate', 'Master the art and balance of bocce with a great team from lower mainland'),
('Really Bad Tennis', 2, 'bi weekly', 'thursday sunday', 'evening', 'Parker Elementary School', 'beginner', 'Ready for some embarrasingly bad tennis? come make a fool of yourself with others pretending we know what were even doing'),
('Frolfingly Fun', 3, 'monthly', 'saturday', 'daytime', 'Somewhere killer', 'beginner', 'I know we all live to frolf!'),
('Hike to no mans land', 6, 'weekly', 'saturday', 'daytime', 'Changes regularily', 'intermediate', 'Need a change of scenery? Get out of the city and look around!'),
('Spalunking yo', 8, 'monthly', 'sunday', 'morning', 'Rocky Mountains', 'beginner', 'Come climb into the middle of the Earth with us!'),
('Hike with your dog', 6, 'weekly', 'monday', 'morning', 'North Shore ', 'beginner', 'Walk your dog and walk yourself.'),
('Bike to the beach', 4, 'weekly', 'friday', 'evening', 'Jericho Beach', 'beginner', 'Join us at Jericho Beach, we will hang out and then head off on a group ride to a new destination every week!'),
('After work snowboarding', 3, 'weekly', 'thursday', 'evening', 'Cypress Mountain', 'intermediate', 'Get in some runs during the week and watch the sunset from the hill with your new pals!');


INSERT INTO activity_participants (activity_id, user_id, status)
VALUES (1, 2,'null'),
(2,4,'pending'),
(3,2,'accepted'),
(5,2,'accepted'),
(2,2,'pending'),
(4,4,'pending'),
(4,6,'accepted'),
(4,5,'accepted'),
(6,1,'accepted'),
(6,6,'accepted'),
(6,5,'accepted'),
(6,3,'pending'),
(6,4,'pending'),
(1, 1, 'host'),
(2, 3, 'host'),
(3, 4, 'host'),
(4, 2, 'host'),
(5, 5, 'host'),
(6, 2, 'host'),
(7, 8, 'host'),
(7, 9, 'accepted'),
(7, 10, 'pending'),
(8, 9, 'host'),
(8, 8, 'pending'),
(9, 10, 'host'),
(9, 8, 'accepted');



INSERT INTO tags (name)
VALUES ('outdoor'),
('hiking'), 
('fishing'),
('kayake'),
('court'),
('spikeball'),
('biking'),
('tennis'),
('snowboarding'),
('ski'),
('online'),
('gaming'),
('language practice'),
('quiz party'),
('weekly'),
('bi weekly'),
('monthly'),
('one time'),
('monday'),
('tuesday'),
('wednesday'),
('thursday'),
('friday'),
('saturday'),
('sunday'),
('morning'),
('daytime'),
('evening'),
('beginner'),
('intermediate'),
('recreation'),
('bocce ball'),
('summer'),
('court'),
('tennis'),
('frisbee'),
('advanced');

INSERT INTO activity_tags (activity_id, tag_id)
VALUES (1, 1),
(1, 6),
(1, 31),
(2, 1),
(2, 31),
(2, 32),
(2, 33),
(3, 1),
(3, 34),
(3, 35),
(4, 1),
(4, 31),
(4, 36),
(5, 1),
(5, 31),
(5, 2),
(6, 1),
(6, 31),
(7, 2),
(8, 7),
(9, 9);

INSERT INTO messages (activity_id, user_id, text)
VALUES 
(6, 5, 'Hey Im intersted in your cool activity'),
(6, 2, 'cool deal!'),
(6, 5, 'can i bring my dog with me?'),
(6, 2, 'no!')






