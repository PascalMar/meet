Feature: Specify number of events

  Scenario: When user hasn’t specified a number, 32 is the default number.
    Given the user has not specified or filtered any number
    When the user sees the list
    Then the default number of displayed events should be 32

  Scenario: User can change the number of events they want to see.
    Given the user has events displayed
    When the user chooses to change the number of events displayed
    Then the number of events displayed should update to the selected number