import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';

Meteor.publish('links', function(typeSearch) {
  if (typeSearch) {
    return LinksCollection.find({ type: typeSearch });
  } else {
    return LinksCollection.find();
  }
})

function insertLink(title: string, url: string, type: string) {
  LinksCollection.insert({ title, url, type, createdAt: new Date() });
}

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  if (LinksCollection.find().count() === 0) {
    insertLink(
      'Do the Tutorial',
      'https://www.meteor.com/tutorials/react/creating-an-app',
      'tutorial'
    );

    insertLink(
      'Follow the Guide',
      'http://guide.meteor.com',
      'guide'
    );

    insertLink(
      'Read the Docs',
      'https://docs.meteor.com',
      'guide'
    );

    insertLink(
      'Discussions',
      'https://forums.meteor.com',
      'discussion'
    );
  }
});
