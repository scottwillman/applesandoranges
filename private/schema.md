### Schools
```javascript
Name     = String
Address  = {
	Street  = String
	City    = String
	State   = String
	ZipCode = String
}
Phone = String
Email = String
```

### Classrooms
```javascript
Name     = String
School   = school._id
Teachers = [
	{
		Name  = String
		Phone = String
		Email = String
	},
]
RoomParents = [user._id, ]
Children    = [child._id, ]
Active = {
	Value     = Boolean
	Timestamp = Date
}
```


### Users
```javascript
Email   = String
Profile = {
	Name  = String
	Phone = String
	Children = [
		{
			Child        = child._id,
			Relationship = String
			Classroom    = classroom._id
		}
	]
	AdditionalInfo = String
	Active = {
		Value     = Boolean
		Timestamp = Date
	}
	LastLogin = Date
}
```

### Children
```javascript
Name      = String
Birthdate = Date
Gender    = String
Active = {
	Value     = Boolean
	Timestamp = Date
}
```

### UserActivityLog
*Sender* and *Receiver* designate the object creating the action and the object being acted upon, respectively. Example: `Sender = User` and `Receiver = Classroom`.
```javascript
Sender   = sender._id
Receiver = {
	Collection = String
	Id         = receiver._id
}
Action    = String
Timestamp = Date
```
