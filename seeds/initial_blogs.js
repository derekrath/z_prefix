exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('blogs').del()
      .then(function () {
        // Inserts seed entries
        return knex('blogs').insert([
          {username: 'John', title: 'How to Skin a Cat', content:'Thats rough'},
          {username: 'John', title: 'How to Ride a Dog', content:'Now thats better'},
          {username: 'John', title: 'How to Pet a Giraffe', content:'Jump high. Lorem ipsum. aoreet lectus a, sodales diam. Curabitur arcu massa, pretium eu ornare at, mattis et elit. In tincidunt.'}
        ]);
      });
  };