/* Study section content: IELTS vocabulary families and Writing guides.
   Each word: [word, when to use it, example, tag]. Tags: B = Speaking and Writing, W = best in Writing,
   S = Speaking only (too informal for essays), X = know it but avoid it. Every example contains the word,
   so the quiz can blank it out. */
var STUDY_VOCAB = [
/* ---------- describing ---------- */
{ id: "stunning", head: "stunning", pos: "adj", topic: "Describing", groups: [
  { label: "Extreme beauty (places, views, people)", words: [
    ["breathtaking", "So beautiful it surprises you. Best for views and scenery.", "The view from the top of Yushan is breathtaking at sunrise.", "B"],
    ["spectacular", "Big, impressive and exciting to look at: views, shows, fireworks.", "The fireworks over Taipei 101 on New Year's Eve are spectacular.", "B"],
    ["magnificent", "Grand and impressive, often large: buildings, landscapes.", "The palace is a magnificent example of Qing-dynasty architecture.", "B"],
    ["picturesque", "Pretty like a painting, usually villages or countryside.", "Jiufen is a picturesque old mining town in the hills.", "B"],
    ["exquisite", "Beautiful in a delicate, detailed way: craftsmanship, food, design.", "The museum displays exquisite jade carvings.", "B"],
    ["striking", "Beautiful and very noticeable, often because it is unusual.", "The new library has a striking glass facade.", "B"],
    ["gorgeous", "Very beautiful or pleasant. Friendly, informal tone.", "We had gorgeous weather for the whole trip.", "S"],
    ["dazzling", "So bright or impressive it almost blinds you: lights, performances.", "The pianist gave a dazzling performance of Rachmaninoff.", "B"],
    ["ravishing", "Old-fashioned, used about a woman's looks. Sounds odd in the test.", "She looked ravishing in the old film.", "X"]]},
  { label: "Great surprise or impact", words: [
    ["remarkable", "Unusual and worth noticing. The safest choice for Writing.", "There was a remarkable improvement in literacy rates.", "W"],
    ["staggering", "Shockingly large, especially numbers.", "Online sales rose by a staggering 80 per cent.", "W"],
    ["astonishing", "Extremely surprising.", "It is astonishing how quickly children learn languages.", "B"],
    ["astounding", "Even stronger than astonishing; shocking.", "The cost of housing in the city is astounding.", "B"],
    ["awe-inspiring", "Makes you feel respect and wonder: nature, achievements.", "Standing under the redwoods was an awe-inspiring experience.", "B"],
    ["jaw-dropping", "Informal: so surprising your mouth opens.", "The prices in that restaurant were jaw-dropping.", "S"],
    ["mind-blowing", "Informal: extremely exciting or surprising.", "The first time I heard an orchestra live, it was mind-blowing.", "S"],
    ["sensational", "Very exciting; also used for news that shocks on purpose.", "Some newspapers publish sensational stories to sell copies.", "B"]]}]},

{ id: "interesting", head: "interesting", pos: "adj", topic: "Describing", groups: [
  { label: "Holds your attention", words: [
    ["fascinating", "Extremely interesting. The natural upgrade in Speaking.", "I find the history of my hometown fascinating.", "B"],
    ["intriguing", "Interesting because it is strange or mysterious.", "The idea that plants can communicate is intriguing.", "B"],
    ["captivating", "Holds your attention completely, like a spell: stories, performers.", "She is a captivating storyteller.", "B"],
    ["absorbing", "So interesting you forget time: books, work.", "Composing music is the most absorbing thing I do.", "B"],
    ["engaging", "Pleasant and keeps people involved: teachers, lessons.", "Good teachers make even grammar lessons engaging.", "B"]]},
  { label: "Makes you think", words: [
    ["thought-provoking", "Makes you think seriously: films, articles, questions.", "It was a thought-provoking documentary about climate migration.", "B"],
    ["compelling", "So convincing or interesting you cannot ignore it: arguments, evidence.", "There is compelling evidence that exercise improves memory.", "W"],
    ["stimulating", "Encourages new ideas: discussions, environments.", "University offers an intellectually stimulating environment.", "B"]]}]},

{ id: "boring", head: "boring", pos: "adj", topic: "Describing", groups: [
  { label: "Not interesting", words: [
    ["tedious", "Long, slow and boring: tasks, paperwork.", "Filling in visa forms is tedious.", "B"],
    ["monotonous", "Always the same, with no variety: jobs, voices.", "Factory work can be extremely monotonous.", "B"],
    ["mundane", "Ordinary, everyday and unexciting.", "Robots could take over mundane household chores.", "B"],
    ["repetitive", "Doing the same thing again and again.", "Repetitive tasks are the easiest to automate.", "B"],
    ["uninspiring", "Fails to make you feel interested or excited.", "The city centre is full of uninspiring office blocks.", "B"],
    ["dull", "Boring and lifeless; also grey weather.", "The lecture was so dull that half the class fell asleep.", "B"]]}]},

{ id: "big", head: "big / a lot", pos: "adj", topic: "Size and amount", groups: [
  { label: "Large amount or degree (great in Writing)", words: [
    ["substantial", "Large and important: amounts, sums, changes.", "Governments spend a substantial amount on healthcare.", "W"],
    ["considerable", "Large enough to matter.", "The policy caused considerable debate.", "W"],
    ["significant", "Large or important enough to have an effect.", "There was a significant rise in unemployment.", "W"],
    ["sizeable", "Fairly large.", "A sizeable minority of students work part-time.", "W"],
    ["extensive", "Covering a large area or many details: damage, research, networks.", "Taipei has an extensive metro network.", "B"]]},
  { label: "Very large", words: [
    ["enormous", "Extremely large.", "Social media has had an enormous impact on how teenagers communicate.", "B"],
    ["vast", "Huge in area or number: the vast majority, vast deserts.", "The vast majority of commuters travel by train.", "W"],
    ["immense", "Extremely large or great: pressure, value, pleasure.", "Teachers are under immense pressure to improve results.", "B"],
    ["massive", "Very big. Fine in Speaking, too casual for most essays.", "There was a massive queue outside the new bubble-tea shop.", "S"]]},
  { label: "Many / a lot of", words: [
    ["numerous", "Many (with plural nouns).", "Numerous studies have linked sleep to academic performance.", "W"],
    ["a great deal of", "A lot of (with uncountable nouns: time, money, stress).", "Moving abroad involves a great deal of paperwork.", "W"],
    ["a wide range of", "Many different kinds.", "The city offers a wide range of cultural activities.", "B"],
    ["countless", "Too many to count.", "I have spent countless hours practising scales.", "B"],
    ["a plethora of", "Too many, almost an excess. Examiners see it constantly, so use it rarely.", "There is a plethora of apps that promise to teach languages.", "X"]]}]},

{ id: "small", head: "small", pos: "adj", topic: "Size and amount", groups: [
  { label: "Small change or amount", words: [
    ["slight", "Small change. Very common in Task 1.", "There was a slight drop in sales in March.", "W"],
    ["marginal", "Very small and not very important.", "Prices rose by a marginal 0.5 per cent.", "W"],
    ["negligible", "So small it does not matter.", "The difference between the two groups was negligible.", "W"],
    ["modest", "Not large, but not tiny: incomes, increases, budgets.", "Most artists earn a modest income.", "B"],
    ["minimal", "The smallest possible: effort, risk, cost.", "Online courses can be run at minimal cost.", "W"],
    ["minor", "Not very important or serious: problems, injuries, roles.", "There were only minor delays on the motorway.", "B"]]}]},

{ id: "important", head: "important", pos: "adj", topic: "Opinions and essays", groups: [
  { label: "Very important", words: [
    ["crucial", "Extremely important, often for success: crucial role, crucial factor.", "Early diagnosis is crucial for treating cancer.", "W"],
    ["vital", "Necessary for something to exist or work.", "Clean water is vital to public health.", "W"],
    ["essential", "Absolutely necessary.", "Digital skills are essential in the modern workplace.", "B"],
    ["fundamental", "Basic and at the root of something: rights, principles, changes.", "Education is a fundamental human right.", "W"],
    ["pivotal", "Central; everything depends on it: a pivotal role, moment.", "Teachers play a pivotal role in shaping young people's values.", "W"],
    ["indispensable", "So important you cannot manage without it.", "Smartphones have become indispensable to daily life.", "W"],
    ["paramount", "More important than anything else. Very formal.", "Passenger safety is paramount.", "W"]]}]},

{ id: "good", head: "good", pos: "adj", topic: "Opinions and essays", groups: [
  { label: "Has good effects", words: [
    ["beneficial", "Having a good effect (beneficial to/for).", "Regular exercise is beneficial to mental health.", "W"],
    ["advantageous", "Giving an advantage.", "Speaking two languages is advantageous in the job market.", "W"],
    ["favourable", "Positive or helpful: conditions, reviews, outcomes.", "The climate is favourable for growing tea.", "W"],
    ["constructive", "Helpful and aimed at improving: criticism, feedback.", "Constructive feedback helps students improve faster.", "B"]]},
  { label: "Worth doing", words: [
    ["rewarding", "Gives satisfaction: jobs, experiences.", "Teaching music to children is incredibly rewarding.", "B"],
    ["worthwhile", "Worth the time, money or effort.", "Learning a second language is always worthwhile.", "B"],
    ["fulfilling", "Makes you feel happy and satisfied with your life.", "Many people want a fulfilling career rather than a high salary.", "B"]]},
  { label: "High quality", words: [
    ["outstanding", "Excellent, clearly better than others.", "The orchestra gave an outstanding performance.", "B"],
    ["exceptional", "Unusually good.", "She has an exceptional talent for languages.", "B"],
    ["superb", "Excellent. Warm and enthusiastic tone.", "The food at the night market was superb.", "S"]]}]},

{ id: "bad", head: "bad", pos: "adj", topic: "Opinions and essays", groups: [
  { label: "Has bad effects", words: [
    ["detrimental", "Causing harm (detrimental to). Strong Writing word.", "Excessive screen time is detrimental to children's eyesight.", "W"],
    ["harmful", "Causing harm.", "Harmful chemicals are still used in some farming.", "B"],
    ["adverse", "Negative, unwanted: adverse effects, adverse weather.", "The drug has few adverse effects.", "W"],
    ["damaging", "Causing damage, including to reputations and relationships.", "The scandal was damaging to the company's reputation.", "B"],
    ["counterproductive", "Has the opposite effect to the one intended.", "Punishing students harshly can be counterproductive.", "W"]]},
  { label: "Very bad situation", words: [
    ["dire", "Very serious or urgent: consequences, situations.", "Ignoring climate change will have dire consequences.", "W"],
    ["appalling", "Shockingly bad: conditions, behaviour.", "Workers in some factories face appalling conditions.", "B"],
    ["undesirable", "Not wanted, likely to cause problems.", "Fast urban growth has some undesirable side effects.", "W"]]}]},

{ id: "difficult", head: "difficult", pos: "adj", topic: "Describing", groups: [
  { label: "Hard to do", words: [
    ["challenging", "Difficult in a way that tests your ability. Positive tone.", "My first MBA exam was more challenging than I expected.", "B"],
    ["demanding", "Needs a lot of time, effort or skill: jobs, schedules.", "Working while studying is very demanding.", "B"],
    ["arduous", "Long, tiring and hard: journeys, tasks.", "Climbing the mountain was an arduous six-hour trek.", "W"],
    ["daunting", "Makes you feel nervous before you start.", "Moving to a new country alone can be daunting.", "B"],
    ["formidable", "Very difficult to deal with; impressive: task, opponent.", "Reducing traffic in big cities is a formidable task.", "W"],
    ["tough", "Difficult. Natural in Speaking.", "It was a tough decision to leave my hometown.", "S"]]},
  { label: "Hard to understand", words: [
    ["complex", "Has many connected parts.", "Climate change is a complex problem with no simple solution.", "B"],
    ["intricate", "Has many small, detailed parts: patterns, plots, designs.", "Bach's fugues are incredibly intricate.", "B"],
    ["problematic", "Causing problems; difficult to deal with.", "Relying on a single source of income can be problematic.", "W"]]}]},

{ id: "easy", head: "easy", pos: "adj", topic: "Describing", groups: [
  { label: "Not difficult", words: [
    ["straightforward", "Simple and easy to understand or do.", "The application process is fairly straightforward.", "B"],
    ["effortless", "Looks as if it needs no effort.", "Her English sounds effortless.", "B"],
    ["manageable", "Possible to deal with.", "Breaking a big task into steps makes it manageable.", "B"],
    ["accessible", "Easy to reach, use or understand.", "Public libraries make knowledge accessible to everyone.", "W"],
    ["user-friendly", "Easy for people to use: apps, websites, machines.", "The new banking app is very user-friendly.", "B"]]}]},

{ id: "happy", head: "happy", pos: "adj", topic: "Feelings", groups: [
  { label: "Very happy", words: [
    ["delighted", "Very pleased (delighted to / with).", "I was delighted to be accepted onto the MBA programme.", "B"],
    ["thrilled", "Extremely happy and excited. Natural in Speaking.", "My parents were thrilled when I got the job.", "S"],
    ["elated", "Extremely happy, often after success.", "I felt elated after my first solo concert.", "B"],
    ["over the moon", "Idiom: extremely happy. Speaking only.", "I was over the moon when I passed my driving test.", "S"]]},
  { label: "Calmly happy", words: [
    ["content", "Quietly satisfied (content with).", "My grandparents are content with a simple life.", "B"],
    ["fulfilled", "Satisfied because you are using your abilities.", "I feel most fulfilled when I am teaching.", "B"],
    ["cheerful", "Happy and positive in manner.", "Our neighbour is always cheerful in the mornings.", "B"]]}]},

{ id: "sad", head: "sad / upset", pos: "adj", topic: "Feelings", groups: [
  { label: "Sad", words: [
    ["devastated", "Extremely shocked and sad.", "I was devastated when my grandfather passed away.", "B"],
    ["heartbroken", "Extremely sad, usually because of loss or love.", "She was heartbroken when her dog died.", "B"],
    ["disheartened", "Lost hope or confidence.", "I felt disheartened after failing my first exam, but I kept going.", "B"],
    ["miserable", "Very unhappy or uncomfortable; also weather.", "It was a cold, miserable day in London.", "B"],
    ["gloomy", "Sad and without hope; also dark weather.", "The economic forecast is gloomy.", "B"]]}]},

{ id: "tired", head: "tired / stressed", pos: "adj", topic: "Feelings", groups: [
  { label: "No energy left", words: [
    ["exhausted", "Extremely tired.", "I was exhausted after the overnight flight.", "B"],
    ["drained", "Emotionally or physically empty.", "Long meetings leave me completely drained.", "B"],
    ["worn out", "Very tired. Informal.", "By Friday evening I'm usually worn out.", "S"],
    ["burnt out", "Exhausted from working too hard for too long.", "Many nurses felt burnt out after the pandemic.", "B"]]},
  { label: "Too much pressure", words: [
    ["overwhelmed", "Too much to deal with.", "I felt overwhelmed in my first week at university.", "B"],
    ["under pressure", "Feeling forced to achieve something.", "Many students are under pressure to get top grades.", "B"],
    ["frazzled", "Tired and nervous. Informal.", "I was a bit frazzled before my presentation.", "S"]]}]},

{ id: "angry", head: "angry / annoyed", pos: "adj", topic: "Feelings", groups: [
  { label: "Annoyed to angry", words: [
    ["frustrated", "Annoyed because you cannot do or change something.", "Commuters are frustrated by constant delays.", "B"],
    ["irritated", "Slightly annoyed.", "I get irritated when people talk during concerts.", "B"],
    ["exasperated", "Very annoyed after a long time.", "Teachers are exasperated by constant policy changes.", "B"],
    ["furious", "Extremely angry.", "Residents were furious about the new tax.", "B"],
    ["fed up", "Annoyed and bored with something that has continued too long. Informal.", "I'm fed up with the rainy weather.", "S"]]}]},

{ id: "busy", head: "busy / crowded", pos: "adj", topic: "Places", groups: [
  { label: "Full of people or activity", words: [
    ["bustling", "Busy in a lively, positive way: markets, cities.", "Shilin is a bustling night market.", "B"],
    ["hectic", "Very busy and rushed: schedules, days, lifestyles.", "I have a hectic schedule during exam season.", "B"],
    ["congested", "Blocked with traffic.", "The roads into the city are congested at rush hour.", "W"],
    ["overcrowded", "Too many people for the space.", "Overcrowded classrooms make teaching difficult.", "B"],
    ["packed", "Completely full. Informal.", "The MRT is packed in the mornings.", "S"],
    ["swamped", "Having too much work. Informal.", "I'm swamped with assignments this week.", "S"]]}]},

{ id: "quiet", head: "quiet / peaceful", pos: "adj", topic: "Places", groups: [
  { label: "Calm places", words: [
    ["tranquil", "Calm and peaceful.", "The temple garden is a tranquil place to read.", "B"],
    ["serene", "Calm and beautiful.", "The lake looks serene early in the morning.", "B"],
    ["secluded", "Private and hidden away from people.", "We stayed in a secluded cabin in the mountains.", "B"],
    ["idyllic", "Perfect and peaceful, like a dream.", "My grandparents live in an idyllic village by the sea.", "B"],
    ["laid-back", "Relaxed and not stressful: atmosphere, people.", "Tainan has a laid-back atmosphere.", "S"]]}]},

{ id: "expensive", head: "expensive / cheap", pos: "adj", topic: "Money", groups: [
  { label: "Costs a lot", words: [
    ["costly", "Expensive, often in effort or harm too: costly mistakes.", "Repairing old bridges is costly.", "W"],
    ["exorbitant", "Much too expensive: prices, rents, fees.", "Students struggle to pay exorbitant rents.", "W"],
    ["overpriced", "More expensive than it should be.", "Food at the airport is overpriced.", "B"],
    ["pricey", "Expensive. Informal.", "The restaurants downtown are a bit pricey.", "S"]]},
  { label: "Does not cost much", words: [
    ["affordable", "Cheap enough for most people.", "The government should build more affordable housing.", "B"],
    ["reasonably priced", "Fair price for what you get.", "The cafes near campus are reasonably priced.", "B"],
    ["economical", "Saves money: cars, methods.", "Public transport is the most economical way to commute.", "B"]]}]},

{ id: "old", head: "old / new", pos: "adj", topic: "Describing", groups: [
  { label: "Old", words: [
    ["outdated", "No longer useful or modern: laws, methods, technology.", "Some exam methods are outdated.", "B"],
    ["obsolete", "No longer used because something better exists.", "Fax machines have become obsolete.", "W"],
    ["historic", "Important in history: a historic building, a historic decision.", "The city has preserved its historic temples.", "B"],
    ["historical", "Connected with the past: historical records, historical novels.", "The museum holds historical documents.", "W"]]},
  { label: "New", words: [
    ["cutting-edge", "The newest and most advanced.", "The hospital uses cutting-edge technology.", "B"],
    ["state-of-the-art", "Using the latest methods and equipment.", "The university has a state-of-the-art concert hall.", "B"],
    ["innovative", "New and original.", "Innovative teaching methods keep students motivated.", "B"],
    ["contemporary", "Belonging to the present time: art, music, society.", "Contemporary music often mixes genres.", "B"]]}]},

{ id: "popular", head: "popular / common", pos: "adj", topic: "Describing", groups: [
  { label: "Liked by many", words: [
    ["sought-after", "Wanted by many people: skills, jobs, products.", "Data analysis is a highly sought-after skill.", "B"],
    ["well-received", "Liked by audiences or critics.", "The new film was well-received by critics.", "B"],
    ["trendy", "Fashionable at the moment. Informal.", "Matcha drinks are really trendy right now.", "S"]]},
  { label: "Happening a lot", words: [
    ["widespread", "Happening in many places or among many people.", "There is widespread concern about air pollution.", "W"],
    ["prevalent", "Common at a particular time or place.", "Obesity is more prevalent in urban areas.", "W"],
    ["mainstream", "Accepted by most people; not unusual.", "Online shopping has become mainstream.", "B"]]}]},

{ id: "dangerous", head: "dangerous", pos: "adj", topic: "Describing", groups: [
  { label: "Dangerous", words: [
    ["hazardous", "Dangerous, especially to health: waste, chemicals, conditions.", "Factories must dispose of hazardous waste safely.", "W"],
    ["perilous", "Very dangerous. Formal and dramatic.", "Migrants make perilous journeys across the sea.", "W"],
    ["precarious", "Unstable and likely to fail or fall: jobs, finances, positions.", "Many young workers are in precarious employment.", "W"],
    ["life-threatening", "Could kill someone.", "Air pollution can cause life-threatening illnesses.", "B"]]}]},

{ id: "useful", head: "useful", pos: "adj", topic: "Describing", groups: [
  { label: "Useful", words: [
    ["valuable", "Very useful or important: skills, experience, advice.", "An internship gives students valuable experience.", "B"],
    ["invaluable", "Extremely useful (not 'not valuable'!).", "My teacher's advice was invaluable.", "B"],
    ["practical", "Useful in real situations.", "Schools should teach more practical skills such as budgeting.", "B"],
    ["handy", "Useful and convenient. Informal.", "A translation app is really handy when you travel.", "S"],
    ["instrumental", "Very important in making something happen (instrumental in doing).", "Social media was instrumental in spreading the campaign.", "W"]]}]},

/* ---------- verbs and phrases for essays ---------- */
{ id: "improve", head: "increase / improve (verbs)", pos: "verb", topic: "Essay verbs", groups: [
  { label: "Make better or stronger", words: [
    ["enhance", "Improve quality, value or ability.", "Music lessons can enhance children's concentration.", "W"],
    ["boost", "Increase or improve quickly: economy, confidence, sales.", "Tourism can boost the local economy.", "B"],
    ["strengthen", "Make stronger: relationships, laws, economies.", "Shared hobbies strengthen family bonds.", "B"],
    ["foster", "Encourage something to develop: creativity, cooperation, relationships.", "Group projects foster teamwork.", "W"],
    ["broaden", "Make wider: horizons, knowledge, perspectives.", "Travelling broadens young people's horizons.", "B"],
    ["promote", "Help something happen or grow; advertise.", "The campaign aims to promote healthy eating.", "W"]]}]},

{ id: "reduce", head: "reduce / harm (verbs)", pos: "verb", topic: "Essay verbs", groups: [
  { label: "Make smaller or less serious", words: [
    ["curb", "Control or limit something bad: pollution, spending.", "Cities have introduced congestion charges to curb traffic.", "W"],
    ["alleviate", "Make pain or a problem less severe: poverty, stress, congestion.", "Building more housing would alleviate the shortage.", "W"],
    ["mitigate", "Reduce how harmful something is: risks, effects.", "Planting trees can mitigate the effects of urban heat.", "W"],
    ["tackle", "Deal with a difficult problem.", "Governments must tackle youth unemployment.", "B"]]},
  { label: "Damage or slow down", words: [
    ["undermine", "Weaken gradually: confidence, authority, efforts.", "Constant criticism can undermine a child's confidence.", "W"],
    ["hinder", "Make progress difficult.", "A lack of funding has hindered research.", "W"],
    ["erode", "Destroy slowly: trust, values, coastlines.", "Fake news erodes public trust in the media.", "W"],
    ["jeopardise", "Put in danger: careers, safety, chances.", "Cheating could jeopardise your entire career.", "W"]]}]},

{ id: "cause", head: "cause / result", pos: "phrase", topic: "Essay verbs", groups: [
  { label: "A causes B", words: [
    ["lead to", "Cause (A leads to B).", "Poor diet can lead to serious health problems.", "B"],
    ["result in", "Have as a result.", "The new law could result in fewer road deaths.", "W"],
    ["contribute to", "Be one of the causes.", "Long working hours contribute to stress.", "W"],
    ["give rise to", "Cause something to happen, often a problem. Formal.", "Rapid urbanisation can give rise to housing shortages.", "W"],
    ["trigger", "Cause something to start suddenly.", "The price rise triggered protests.", "B"]]},
  { label: "B comes from A", words: [
    ["stem from", "Have its origin in.", "Many conflicts stem from misunderstandings.", "W"],
    ["be attributed to", "Be said to be caused by.", "The fall in crime can be attributed to better street lighting.", "W"]]}]},

{ id: "show", head: "show (Task 1 and essays)", pos: "verb", topic: "Essay verbs", groups: [
  { label: "Describing what a chart does", words: [
    ["illustrates", "Shows clearly. A safe Task 1 opener.", "The line graph illustrates changes in museum attendance.", "W"],
    ["compares", "Shows two or more things side by side.", "The bar chart compares spending in four countries.", "W"],
    ["depicts", "Shows in a picture or diagram.", "The diagram depicts how paper is recycled.", "W"],
    ["gives information about", "Neutral alternative.", "The table gives information about car ownership.", "W"]]},
  { label: "Showing evidence", words: [
    ["demonstrates", "Proves clearly.", "This study demonstrates that sleep affects memory.", "W"],
    ["indicates", "Suggests something is true.", "The data indicates a shift towards online learning.", "W"],
    ["highlights", "Draws attention to something important.", "The report highlights the need for cheaper housing.", "W"]]}]},

{ id: "opinion", head: "I think", pos: "phrase", topic: "Opinions and essays", groups: [
  { label: "Writing (formal)", words: [
    ["I would argue that", "States your view confidently.", "I would argue that prevention is more effective than cure.", "W"],
    ["I firmly believe that", "Strong opinion; good for a thesis.", "I firmly believe that education should be free.", "W"],
    ["it could be argued that", "Introduces a view, often one you will answer.", "It could be argued that tourism damages local culture.", "W"],
    ["it is widely believed that", "What many people think.", "It is widely believed that technology isolates people.", "W"]]},
  { label: "Speaking (natural)", words: [
    ["from my perspective", "In my opinion.", "From my perspective, cooking at home is healthier.", "B"],
    ["I'd say", "Softens an answer. Very natural.", "I'd say I'm more of a morning person.", "S"],
    ["I'm inclined to think", "Tentative opinion.", "I'm inclined to think that cities will keep growing.", "S"],
    ["as far as I'm concerned", "In my opinion (slightly strong).", "As far as I'm concerned, music should be taught in every school.", "S"]]}]},

{ id: "problem", head: "problem", pos: "noun", topic: "Opinions and essays", groups: [
  { label: "Kinds of problem", words: [
    ["issue", "Topic or problem people discuss.", "Housing is a major issue for young people.", "B"],
    ["concern", "Something that worries people.", "Safety is a growing concern for parents.", "W"],
    ["drawback", "A disadvantage.", "The main drawback of remote work is isolation.", "W"],
    ["obstacle", "Something that blocks progress.", "Cost is the biggest obstacle to studying abroad.", "B"],
    ["setback", "Something that delays progress.", "Losing the funding was a major setback.", "B"],
    ["dilemma", "A difficult choice between two options.", "Many graduates face the dilemma of salary versus passion.", "B"]]}]},

{ id: "change", head: "change (verbs)", pos: "verb", topic: "Essay verbs", groups: [
  { label: "Change", words: [
    ["transform", "Change completely, usually improving.", "The internet has transformed the way we shop.", "B"],
    ["revolutionise", "Change completely and dramatically.", "Smartphones revolutionised photography.", "W"],
    ["alter", "Change partly.", "The council altered its plans after complaints.", "W"],
    ["adapt", "Change to suit new conditions (adapt to).", "Older workers must adapt to new technology.", "B"],
    ["shift", "Change position or direction: attitudes, focus.", "Attitudes towards mental health have shifted.", "B"]]}]},

/* ---------- Task 1 chart language (from your list, plus what goes with it) ---------- */
{ id: "up", head: "Upward trends", pos: "chart", topic: "Task 1 charts", groups: [
  { label: "Verbs (past tense for past data)", words: [
    ["rose", "Most neutral. rose from A to B / rose by N.", "The number of visitors rose from 2 million to 3.5 million.", "W"],
    ["climbed", "Rose steadily, often step by step.", "Sales climbed to a peak of 900 units in July.", "W"],
    ["surged", "Rose suddenly and strongly.", "Online orders surged during the lockdown.", "W"],
    ["peaked at", "Reached its highest point (peaked at + number).", "Unemployment peaked at 12 per cent in 2010.", "W"],
    ["doubled", "Became twice as large. Also tripled, quadrupled.", "The population of the city doubled between 1990 and 2020.", "W"]]},
  { label: "Noun phrases", words: [
    ["experienced an upward trend", "Rose over a long period.", "Car ownership experienced an upward trend throughout the period.", "W"],
    ["a sharp rise in", "Adjective + noun: a sharp/steady/slight rise in X.", "There was a sharp rise in the price of rice.", "W"],
    ["a steady increase in", "Rose at an even pace.", "The chart shows a steady increase in solar energy use.", "W"]]}]},

{ id: "down", head: "Downward trends", pos: "chart", topic: "Task 1 charts", groups: [
  { label: "Verbs", words: [
    ["fell", "Most neutral (fall, fell, fallen).", "The birth rate fell to 1.1 children per woman.", "W"],
    ["declined", "Fell gradually, often over a long time.", "Newspaper sales declined steadily over the decade.", "W"],
    ["dropped", "Fell, often quickly.", "Temperatures dropped to minus 5 degrees in January.", "W"],
    ["plummeted", "Fell very fast and very far. Only for big drops.", "Tourist numbers plummeted in 2020.", "W"],
    ["hit a low of", "Reached its lowest point.", "The share price hit a low of 12 dollars in March.", "W"],
    ["halved", "Became half as large.", "The number of smokers halved over thirty years.", "W"]]},
  { label: "Noun phrases", words: [
    ["a dramatic fall in", "Big, sudden drop.", "There was a dramatic fall in coal production.", "W"],
    ["a gradual decline in", "Slow drop over time.", "The graph shows a gradual decline in rural population.", "W"]]}]},

{ id: "flat", head: "Stability and fluctuation", pos: "chart", topic: "Task 1 charts", groups: [
  { label: "No change", words: [
    ["remained steady", "Stayed at about the same level.", "Rice consumption remained steady at around 50 kilograms.", "W"],
    ["plateaued", "Stopped rising and stayed level.", "Sales plateaued after 2015.", "W"],
    ["stayed unchanged", "Exactly the same.", "The price stayed unchanged for five years.", "W"],
    ["hovered around", "Stayed close to a number, moving a little.", "Inflation hovered around 2 per cent.", "W"],
    ["levelled off", "Stopped rising or falling and became steady.", "Demand levelled off in the final quarter.", "W"]]},
  { label: "Up and down", words: [
    ["fluctuated", "Went up and down (fluctuated between A and B).", "Exchange rates fluctuated between 30 and 33 dollars.", "W"],
    ["was erratic", "Changed irregularly and unpredictably.", "Rainfall was erratic throughout the year.", "W"]]}]},

{ id: "compare", head: "Comparisons and shares", pos: "chart", topic: "Task 1 charts", groups: [
  { label: "Parts of a whole (pie charts)", words: [
    ["accounted for", "Was a part of the total (accounted for + %).", "Rent accounted for 40 per cent of household spending.", "W"],
    ["made up", "Formed a part of.", "Women made up a slight majority of graduates.", "W"],
    ["comprised", "Consisted of (the whole comprised the parts).", "The workforce comprised 60 per cent men and 40 per cent women.", "W"],
    ["a slight majority", "A little over half.", "A slight majority of respondents preferred online shopping.", "W"],
    ["the largest proportion", "The biggest share.", "The largest proportion of energy came from coal.", "W"]]},
  { label: "Comparing figures", words: [
    ["was twice as high as", "Double the other figure. Also three times as high as.", "Spending in Japan was twice as high as in Italy.", "W"],
    ["compared with", "Introduces the second figure.", "Men did 5 hours of housework, compared with 28 hours for women.", "W"],
    ["whereas", "Joins two contrasting facts.", "Sweden recycled 50 per cent of its waste, whereas Greece recycled 15 per cent.", "W"],
    ["the figure for", "Avoids repeating the noun.", "The figure for Canada was slightly lower.", "W"]]}]},

{ id: "degree", head: "How much and how fast", pos: "chart", topic: "Task 1 charts", groups: [
  { label: "Big or fast (adverb + verb, or adjective + noun)", words: [
    ["sharply", "Quickly and by a lot. Noun form: a sharp rise.", "Prices rose sharply in the second half of the year.", "W"],
    ["dramatically", "Very large and sudden.", "Sales fell dramatically after the scandal.", "W"],
    ["significantly", "By a large amount.", "The number of cyclists increased significantly.", "W"],
    ["considerably", "By quite a lot.", "Costs were considerably higher in the city.", "W"]]},
  { label: "Small or slow", words: [
    ["slightly", "By a small amount.", "The figure dipped slightly in May.", "W"],
    ["marginally", "By a very small amount.", "Exports were marginally higher than imports.", "W"],
    ["steadily", "At an even, continuous pace.", "Attendance grew steadily over the decade.", "W"],
    ["gradually", "Slowly over a long time.", "The gap between the two groups gradually narrowed.", "W"]]},
  { label: "Approximately", words: [
    ["approximately", "About (formal).", "Approximately 30 per cent of adults smoked in 1990.", "W"],
    ["just over", "A little more than.", "Just over half of the students lived at home.", "W"],
    ["just under", "A little less than.", "Just under a quarter of the budget went on transport.", "W"],
    ["nearly", "Almost, but not quite.", "Nearly 40 per cent of the land was forest.", "W"]]}]}
];

/* Task 1 grammar of trends: rules with right and wrong examples */
var STUDY_T1_RULES = [
  ["to vs by", "rose <b>to</b> 50% = the new level. rose <b>by</b> 10% = the size of the change.", "Sales rose by 20 per cent, to 600 units."],
  ["Verb + adverb or adjective + noun", "Use both, so you are not repeating one pattern.", "Prices rose sharply. / There was a sharp rise in prices."],
  ["a rise <b>in</b>, not of", "rise/increase/fall/decline + <b>in</b> + the thing. <b>of</b> + the amount.", "a rise in prices / a rise of 5 per cent"],
  ["Number vs amount", "the number of + countable plural; the amount of + uncountable; the proportion/percentage of.", "the number of cars / the amount of water"],
  ["per cent vs percentage", "Use a number + per cent (or %); use percentage with no number.", "30 per cent of users / the percentage of users"],
  ["Tense", "Past years: past simple. Projections: is expected to / is predicted to / will. No date: present simple.", "By 2040, the figure is expected to reach 70 per cent."],
  ["Irregular verbs", "rise, rose, risen. fall, fell, fallen. grow, grew, grown. Never 'rised'.", "The figure had risen to 40 by 2010."],
  ["the number ... is", "The number of + plural noun takes a singular verb.", "The number of tourists was highest in July."]
];

/* Writing guides */
var STUDY_GUIDE = {
t1: {
  title: "Task 1: describe a chart in 20 minutes",
  intro: "Write at least 150 words (aim for 170–190). Spend 3 minutes planning, 15 writing and 2 checking. Report what the visual shows: never give opinions or reasons.",
  structure: [
    ["Paragraph 1 · Introduction (1 sentence)", "Paraphrase the question: say what the chart shows, where and when. Change the words, not the meaning.", "The chart below shows the number of visitors to three museums in London between 2000 and 2020. → The line graph compares how many people visited three London museums over a twenty-year period."],
    ["Paragraph 2 · Overview (2 sentences)", "The most important paragraph: without it, Task Achievement is capped at Band 5. Give the two biggest features: the overall trend and the biggest or smallest item, or the most striking contrast. No numbers.", "Overall, visits to the Science Museum rose steadily, while the other two museums saw declining numbers. The Science Museum was also the most popular by the end of the period."],
    ["Paragraph 3 · Details, group A", "Group items that behave alike. Give key figures (start, end, peak) and compare them.", "In 2000, the Science Museum attracted 2 million visitors, compared with 3 million for the History Museum..."],
    ["Paragraph 4 · Details, group B", "The other group or the contrasting trend. Every claim needs a number.", "By contrast, the History Museum's attendance fell from 3 million to just under 2 million..."]
  ],
  types: [
    ["Line graph", "Changes over time. Describe the direction and speed of each line, peaks and lows, and where the lines cross.", "Overall, X rose while Y fell, and X overtook Y in 2010."],
    ["Bar chart", "Comparisons between categories, sometimes over time. Group similar bars; compare the highest and lowest.", "Overall, women spent more time on housework than men in every country, and the gap was widest in Japan."],
    ["Pie charts", "Shares of a total. Use accounted for, made up, the largest proportion. Compare pies if there are two years.", "Overall, coal remained the main source of energy, although the share of renewables more than doubled."],
    ["Table", "Many numbers. Do not describe every figure: pick the highest, lowest and any clear pattern.", "Overall, car ownership was highest in the USA and lowest in India in both years."],
    ["Process diagram", "Stages in order. Use the passive and sequence words (first, next, once, finally). Say how many stages in the overview.", "Overall, there are six stages, beginning with harvesting and ending with packaging."],
    ["Map", "Changes to a place. Use the passive and location words (to the north of, next to, was replaced by, was converted into).", "Overall, the town became more residential, and the farmland was replaced by housing and a school."],
    ["Mixed (two charts)", "Describe each, and link them if there is a connection. Overview covers both.", "Overall, spending rose in every category, and housing remained the biggest expense."]
  ],
  model: {
    q: "The table below shows the number of visitors (millions) to three museums in a city in 2000, 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    data: [["Museum", "2000", "2010", "2020"], ["Science Museum", "2.0", "3.1", "4.2"], ["History Museum", "3.0", "2.6", "1.9"], ["Art Gallery", "1.5", "1.6", "1.5"]],
    text: "The table compares the number of people who visited three museums in a city at ten-year intervals between 2000 and 2020.\n\nOverall, the Science Museum became markedly more popular, while attendance at the History Museum declined, and the Art Gallery's figures barely changed. By the end of the period, the Science Museum had replaced the History Museum as the most visited of the three.\n\nIn 2000, the History Museum attracted 3 million visitors, compared with 2 million for the Science Museum. Over the following two decades, however, their positions were reversed. The Science Museum's attendance rose steadily, to 3.1 million in 2010 and 4.2 million in 2020, more than double its original figure. Meanwhile, visits to the History Museum fell gradually to just under 2 million.\n\nThe Art Gallery, by contrast, remained the least visited museum throughout. Its figures hovered around 1.5 million, rising marginally to 1.6 million in 2010 before returning to their original level by 2020.",
    notes: ["Paraphrased intro: 'shows' → 'compares', 'in 2000, 2010 and 2020' → 'at ten-year intervals'.", "Overview gives three trends and the key change (the leader changed), with no numbers.", "Body paragraphs group the two museums that swapped places, then the stable one.", "Varied trend language: rose steadily, more than double, fell gradually, hovered around, rose marginally.", "About 170 words."]
  },
  checklist: [
    ["Task Achievement", "Clear overview? Key features covered? Every claim has an accurate number? No opinions?"],
    ["Coherence & Cohesion", "Four paragraphs? Items grouped logically? Varied linkers (while, whereas, by contrast, meanwhile)?"],
    ["Lexical Resource", "Intro paraphrased? Trend words varied (not 'increase' five times)? Correct collocations (rose sharply, a sharp rise in)?"],
    ["Grammar", "Right tense for the dates? to/by correct? Complex sentences (compared with, which, while)? Articles and agreement checked?"]
  ]
},
t2: {
  title: "Task 2: an essay in 40 minutes",
  intro: "Write at least 250 words (aim for 270–320). Spend 5 minutes planning, 30 writing and 5 checking. Task 2 counts twice as much as Task 1.",
  types: [
    ["Opinion", "To what extent do you agree or disagree?", "State your position in the introduction and keep it the same. Two body paragraphs supporting it, or one for each side with your view clearly winning.", "I strongly agree that governments should prioritise prevention, because it is cheaper and improves quality of life."],
    ["Discussion", "Discuss both views and give your own opinion.", "Body 1: the first view. Body 2: the second view. Your opinion in the introduction and conclusion (it can be one of the views).", "While some argue that university should be free, others believe students should pay. This essay will discuss both views, but I believe that tuition should be free for most students."],
    ["Advantages and disadvantages", "Do the advantages outweigh the disadvantages?", "If asked 'outweigh', you must say which side is bigger. Body 1: advantages. Body 2: disadvantages.", "Although working from home has some drawbacks, I believe its advantages clearly outweigh them."],
    ["Problem and solution / Causes and effects", "What are the causes of this problem? What can be done?", "Body 1: two causes (or problems). Body 2: matching solutions (or effects).", "This essay will examine why traffic congestion is worsening and suggest two ways to reduce it."],
    ["Two-part question", "Why is this happening? Is it a positive or negative development?", "Answer both questions directly, one per body paragraph.", "People are moving to cities mainly for work, and I believe this trend is largely positive."]
  ],
  paragraph: [
    ["Topic sentence", "One main idea that answers the question.", "The most compelling reason to fund prevention is that it costs far less than treatment."],
    ["Explain", "Why or how this is true.", "Vaccinations and screening programmes are inexpensive, whereas treating advanced illnesses requires costly drugs, surgery and long hospital stays."],
    ["Example", "A specific, realistic example or data.", "For instance, a flu vaccine costs a few dollars, while a single week in intensive care can cost thousands."],
    ["Link back", "Connect to your position.", "Money spent on prevention therefore stretches public budgets much further."]
  ],
  linkers: [
    ["Adding", "Furthermore, Moreover, In addition, Not only... but also"],
    ["Contrasting", "However, Nevertheless, On the other hand, Although, Whereas, Despite"],
    ["Cause and result", "Therefore, As a result, Consequently, This means that, Because of this"],
    ["Examples", "For instance, For example, such as, A case in point is"],
    ["Conceding", "Admittedly, It is true that... However, While it is true that..."],
    ["Concluding", "In conclusion, To conclude, Overall"]
  ],
  grammar: [
    ["Conditionals", "If governments invested more in prevention, hospitals would be less overcrowded."],
    ["Relative clauses", "Screening programmes, which are relatively cheap, can detect cancer early."],
    ["Concession", "Although treatment cannot be ignored, prevention offers better long-term value."],
    ["Passive", "It has been estimated that half of all chronic diseases could be prevented."],
    ["Nominalisation", "The prevention of disease (not 'preventing disease is...') sounds more academic."],
    ["Emphasis", "What matters most is not how much is spent, but how it is spent."]
  ],
  model: {
    q: "Some people believe that governments should spend more on preventing illness than on treating it. To what extent do you agree or disagree?",
    text: "Public health budgets are finite, and governments must decide how to divide them between preventing disease and treating people who are already ill. In my view, prevention deserves the larger share, although treatment must never be underfunded.\n\nThe most compelling reason to prioritise prevention is cost. Vaccination campaigns, health education and regular screening are relatively inexpensive, whereas treating advanced illnesses requires costly drugs, surgery and long hospital stays. A flu vaccine, for instance, costs a few dollars, while a single week in intensive care can cost thousands. Every dollar spent on prevention therefore stretches public money further and eases the pressure on overcrowded hospitals.\n\nPrevention also improves people's quality of life in ways that treatment cannot. A patient who recovers from a heart attack may still face years of medication and reduced mobility, whereas someone who avoids the illness altogether through a healthier lifestyle remains productive and independent. Campaigns that encourage exercise, discourage smoking and promote balanced diets thus benefit not only individuals but also the wider economy.\n\nAdmittedly, prevention cannot replace treatment. Accidents, genetic conditions and infectious outbreaks will always occur, and a government that neglected hospitals would fail its citizens at the moment they most need help. The aim, then, should be to rebalance spending rather than to abandon treatment.\n\nIn conclusion, I largely agree that prevention should receive more funding, since it is more cost-effective and leads to healthier, more productive lives. However, treatment services must remain properly funded for those who fall ill despite these efforts.",
    notes: ["Clear position in the introduction ('prevention deserves the larger share'), repeated in the conclusion.", "Each body paragraph: topic sentence, explanation, specific example, link back.", "Concession paragraph ('Admittedly...') shows a balanced, mature argument without changing the position.", "Range: whereas, for instance, therefore, not only... but also, a government that neglected... would fail (hypothetical).", "About 290 words."]
  },
  mistakes: [
    ["Subject–verb agreement", "the number of patients are → is; prevention make → makes; a person get → gets"],
    ["Articles", "government should → governments should / the government should; in other area → in other areas"],
    ["Under 250 words", "Short essays lose Task Response marks however good the English is."],
    ["Memorised openers", "'In this modern era...' and 'It is a debatable topic' earn nothing. Paraphrase the question instead."],
    ["Ideas not developed", "Every idea needs a reason and an example, not just a statement."],
    ["Informal language", "No contractions (don't → do not), no 'a lot of', no 'kids', no questions to the reader."]
  ],
  checklist: [
    ["Task Response", "Answered every part of the question? Clear position from start to end? Ideas extended and supported? 250+ words?"],
    ["Coherence & Cohesion", "One main idea per paragraph, with a topic sentence? Linkers varied but not in every sentence? Pronouns (this, these, such) used to connect ideas?"],
    ["Lexical Resource", "Question paraphrased? Topic collocations (finite budgets, cost-effective, ease the pressure)? Few repeated words? Spelling checked?"],
    ["Grammar", "Mix of complex sentences (if, although, which)? Errors checked: agreement, articles, plurals, tenses?"]
  ]
}
};

/* Practice items checked by Claude (a model answer is shown when offline) */
var STUDY_PRACTICE = {
  overview: [
    { q: "Write the overview (2 sentences, no numbers) for this table: smartphone ownership by age group, 2015 → 2025. 18–29: 80% → 97%. 30–49: 65% → 93%. 50–64: 40% → 82%. 65+: 15% → 61%.", model: "Overall, smartphone ownership rose considerably in every age group over the decade. Younger adults remained the most likely to own a smartphone, although the gap between the youngest and oldest groups narrowed markedly." },
    { q: "Write the overview for this line graph: average house price (thousands of dollars), 2010 → 2020. City A: 300 → 520. City B: 280 → 290. City C: 350 → 240.", model: "Overall, house prices followed very different paths in the three cities: they rose sharply in City A, remained broadly stable in City B and fell in City C. As a result, City A had become by far the most expensive city by 2020." },
    { q: "Write the overview for this pie chart pair: household spending, 1990 → 2020. Housing 25% → 38%. Food 30% → 17%. Transport 15% → 15%. Leisure 10% → 18%. Other 20% → 12%.", model: "Overall, housing overtook food as the largest household expense over the thirty years. The share spent on leisure also grew, while spending on food fell, and transport costs stayed the same." }
  ],
  sentence: [
    { q: "Write one sentence: the number of international students in a country rose from 120,000 in 2012 to 310,000 in 2022.", model: "The number of international students more than doubled, rising from 120,000 in 2012 to 310,000 in 2022." },
    { q: "Write one sentence: coal accounted for 60% of electricity in 2000 and 22% in 2020.", model: "Coal's share of electricity generation fell dramatically, from 60 per cent in 2000 to just 22 per cent in 2020." },
    { q: "Write one sentence comparing: men 5 hours of housework per week, women 28 hours (Japan).", model: "In Japan, women did 28 hours of housework a week, more than five times as much as men, who did only 5." },
    { q: "Write one sentence: bicycle sales hovered between 40,000 and 45,000 a year from 2015 to 2020.", model: "Bicycle sales remained relatively stable between 2015 and 2020, hovering between 40,000 and 45,000 a year." }
  ],
  intro: [
    { q: "Write the introduction (paraphrase + your position) for: Some people think that children should start school at a very early age. Others believe they should not go to school until they are older. Discuss both views and give your own opinion.", model: "While some argue that children benefit from starting school as early as possible, others believe formal education should be delayed until they are older. This essay will consider both views, but I believe that a later start, with plenty of play-based learning beforehand, is better for most children." },
    { q: "Write the introduction for: In many countries, more and more people are living alone. Why is this happening? Is it a positive or negative development?", model: "The number of people living alone has risen sharply in many countries. This essay argues that the trend is driven mainly by greater financial independence and later marriage, and that, despite some risk of loneliness, it is largely a positive development." },
    { q: "Write the introduction for: Some people believe that unpaid community service should be a compulsory part of high school programmes. To what extent do you agree or disagree?", model: "It has been suggested that secondary school students should be required to do unpaid work in their communities. I largely agree with this proposal, as it builds responsibility and practical skills, provided the hours are reasonable and do not affect students' studies." }
  ],
  body: [
    { q: "Write one body paragraph (topic sentence, explain, example, link back) arguing that public transport should be free.", model: "The strongest argument for free public transport is that it would significantly reduce traffic congestion. When buses and trains cost nothing, many commuters who currently drive would switch, as cost is one of the main reasons people choose their cars. Tallinn, the capital of Estonia, offers a case in point: after fares were abolished for residents in 2013, passenger numbers rose noticeably while car journeys into the centre fell. Free fares could therefore ease congestion and the pollution it causes." },
    { q: "Write one body paragraph arguing that learning music benefits children's academic performance.", model: "Learning a musical instrument can enhance children's performance in other subjects. Practising an instrument requires sustained concentration, memory and discipline, which are the same skills needed for mathematics and reading. Several studies have found, for example, that children who take regular music lessons score higher on tests of attention than those who do not. Music education should therefore be seen not as a luxury but as an investment in academic achievement." }
  ]
};
