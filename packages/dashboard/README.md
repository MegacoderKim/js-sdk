###Embeddable Views
Customizable view is provided as a widget url, which can be embedded in any webpage using iframe. 

- Secret key is needed to passed as query param of type key the widget url.
E.g. `https://dashboard.hypertrack.com/widget/list/actions?key=sk_xxxxxxxxxxxxxxxxxxx`.
- Any link in the dashboard can be converted into embeddable widget by appending `widget/` after `dashboard.com`.
E.g. `https://dashboard.hypertrack.com/map/users?ordering=-num_trips` can be embedded using the link `https://dashboard.hypertrack.com/map/users?ordering=-num_trips&key=sk_xxxxxxxxxxxxxxxxxxxxx`, where sk_xxxxxxxxxxxxxx is secret key.

####Some useful widget url

- `https://dashboard.hypertrack.com/widget/actions;lookup_id=<LOOKUP_ID>?key=sk_xxxxxxxxxxxxxx`: 
Actions lookup view, where `<LOOKUP_ID>` is the lookup_id of the actions.
- `https://dashboard.hypertrack.com/widget/users/<USER_ID>/timeline;date=<YYYY-MM-DD>?key=sk_xxxxxxxxxxxxxx`: 
Timeline of a user, where `<USER_ID>` is id of the user, `<YYYY-MM-DD>` is the date of the timeline e.g. `2017-03-21`.
- `https://dashboard.hypertrack.com/widget/actions/<ACTION_ID>?key=sk_xxxxxxxxxxxxxx`: 
Action view, where `<ACTION_ID>` is the id of the actions.
