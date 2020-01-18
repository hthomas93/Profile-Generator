# Profile-Generator
## The Github User Profile Generator

## Purpose
The purpose of the profile generator is for product managers to prepare reports for stakeholders quickly and efficiently. The program provides relevant information about members of a team in a quick and aesthetically pleasing manner.

## User Story
AS A product manager...
I WANT a developer profile generator...
SO THAT I can easily prepare reports for shareholders.

## How it works
This program prompts the user for their Github profile name and their favorite color from the command line. 

Then, an API request is sent to Github that returns the user's information based on their profile name.

Then, a pdf of the user's information is generated dynamically based on the information returned from the request.

![example profile](/example.png "Example Profile")
