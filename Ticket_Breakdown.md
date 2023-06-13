# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## User Story CPH-01: As a Facility owner, I would like to create custom ids for each Agent and see it on the pdf reports
### Why: 
 Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.

### How: 
See subtasks CPH-02, CPH-03, CPH-04, and CPH-05.

### Time/effort estimates (using Fibonacci task evaluation): 
10 

## SubTask CPH-02: (Datebase) - Add new table to store Agent customs ids

### How:
Create a migration on `database` project to add a new table `agent_custons_id` to store new customs ids for Agents. This table must have the following fields: `id`, `custom_id`, `agent_custons_id`, `created_at`, and `updated_at`.
After creating the PR and validating it locally, send a email to `devops@clipboardhealth.com` to run the migrationin  staging and production.

### Time/effort estimates: 
2

### Criteria:
Test the function locally and in staging by trying to inserting a new custon id in the table.
Make sure locally that the down functionally works well in case of a rollback.

## SubTask CPH-03: (Backend) - Update `getShiftsByFacility` function to get the new customs ids

### How: 
Inside the `getShiftsByFacility` function: https://github.com/clipboardhealth/...js#LL5C1-L5C1
Update the query to select the `custom_id` of the `agent_custons_id` by JOINing it with the `agent_id` from `agent` table.
### Time/effort estimates: 
2
### Criteria:
Make sure the testGetShiftsByFacility test (https://github.com/clipboardhealth/...js#LL5C1-L5C1) is updated and contains the new `custom_id` selection.

## SubTask CPH-04: (Backend) - Update `generateReport` function to include the new customs id information
### How: 

### Time/effort estimates: 
3

## SubTask CPH-05: (Backend) - Create an endpoint for Facilities owners to create and update their own customs ids
### How: 
Create an endpoint `POST/ facility/{facility_id}/create-agent-custom-id/{agent_id}` where a Facility admin will create a new agent_custon_id. This endpoint required a custom-id that can be passed on the body request.
Create an endpoint `PATCH/ facility/{facility_id}/update-agent-custom-id/{agent_id}` where a Facility updates a agent_custon_id. This endpoint required the new custom_id on the body request.

### Time/effort estimates: 
3

### Criteria:

## SubTask CPH-06: (Frontend) - Create a new Tab on Facility Admin System to create and update a custom id 
### How: 
Create a new Tab "Custom Id" for Facility Admins to create new ids for the agents that are registed on their shift.
Create a new bff file to call the `POST/ facility/{facility_id}/create-agent-custom-id/{agent_id}` and `PATCH/ facility/{facility_id}/update-agent-custom-id/{agent_id}` endpoint created on task 

### Time/effort estimates: 
3

### Criteria:
