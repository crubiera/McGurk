function ExampleExperiment(jsSheetHandle, jsPsychHandle, survey_code) {
    jsSheetHandle.CreateSession(RunExperiment)

    function RunExperiment(session) {
       	// generate a random subject ID with 15 characters
	var subject_id = jsPsych.randomization.randomID(6);

	// record the condition assignment in the jsPsych data
	// this adds a property called 'subject' and a property called 'condition' to every trial
	jsPsych.data.addProperties({
  		subject: subject_id,
	});

	/* create timeline */
	var timeline = [];

	/* define welcome message trial */
	var welcome = {
  		type: "html-keyboard-response",
  		stimulus: "Welcome to the experiment. We will need to obtain your consent. Press any key to move on to the consent page."
	}
  timeline.push(welcome);

    var check_consent = function(elem) {
      if (document.getElementById('consent_checkbox').checked) {
        return true;
      }
      else {
        alert("If you wish to participate, you must check the box next to the statement 'I agree to participate in this study.'");
        return false;
      }
      return false;
    };

    var consent = {
      type:'external-html',
      url: "https://crubiera.github.io/jsPsychSheet/experiment/external_page.html",
      cont_btn: "consent-button",
    };
    timeline.push(consent);

    var sex = {
          type: 'survey-multi-choice',
          questions: [
            {prompt: "What sex were you assigned at birth, on your original birth certificate?",
            name: 'sex', options: ['Female', 'Male', 'Prefer not to respond'], required:true}
          ],
        };
        timeline.push(sex);

      var age = {
          type: 'survey-text',
          questions: [
            {prompt: "How old are you?", name: 'Age'}
          ],
        };
        timeline.push(age);

  	var instructions = {
      type: "image-keyboard-response",
      stimulus: "https://crubiera.github.io/jsPsychSheet/experiment/video/armsLength.png",
      prompt:"<p> </p><p>Please plug in headphones/turn on your speakers, adjust the volume to a comfortable level, and sit roughly an arm’s length away from the screen as seen in the image. Please maintain eye contact with the screen while each video is being presented. Press any key to continue.</p>",
      width: 600
       }

    timeline.push(instructions);

    var pre_if_trial = {
      timeline: [{
        type: 'video-button-response',
        sources: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryBaVisualBa.mp4'],
        width: 800,
  		  prompt: '<p>Use this video to adjust your volume to a comfortable level. Feel free to repeat the video to adjust the volume, or press continue.</p>',
        choices: ['Repeat','Continue']
  	}],
    loop_function: function(data){
      if(data.values()[0].button_pressed == 0){
        return true;
      } else {
          return false;
      }
    }
  };
      timeline.push(pre_if_trial);


    /* Present a randomized order of all of the videos/trials you wish to show */
    /* Make sure the answer choices are contingent on the video */
    /* The answer choices are mainly from Table 1 in Stropahl et al., 2017 */
    /* We'll have to decide which options to give for the ones that aren't from that table */
    /* To learn more, check out https://www.jspsych.org/overview/timeline/#timeline-variables */

    var practice_trial_instructions = {
      type: "html-keyboard-response",
      stimulus: "You will now be given some practice trials to prepare you for the real experiment. On each practice trial, you will watch a video, report the syllable you perceived, and you will rate your confidence in whether the visual syllable in the video and the auditory syllable you heard were the SAME, or DIFFERENT. There will be 9 practice trials. Press any key to continue."
    };
    timeline.push(practice_trial_instructions);

    var practice_trial = {
      timeline: [
			{
				type: 'video-button-response',
				sources: jsPsych.timelineVariable('video'),
				width: 800,
				choices: [],
				data: jsPsych.timelineVariable('video'), /* Store the video name */
				trial_ends_after_video: true,
				prompt: '<p></p>'

			},
			{
				type: 'video-button-response',
				sources: [],
				width: 800,
				choices: jsPsych.timelineVariable('syllables'),
				data: jsPsych.timelineVariable('syllables'), /* Store the answer choices on that trial */
				prompt: '<p>Which syllable did you perceive?</p>'

			},
			{
        type: 'html-slider-response',
  			stimulus: '<p>Were the auditory and visual syllables the same, or different?</p>',
  			labels: ['1<br>Definitely same<br>','2','3<br>Probably same<br>','4','5<br>Not sure<br>','6','7<br>Probably different<br>','8','9<br>Definitely different<br>'],
  			min: 1,
  			max: 9,
  			start: function(){
  				return jsPsych.randomization.sampleWithoutReplacement([10, 20, 30, 40, 50, 60, 70, 80, 90], 1)[0];
  				},
  			step: 0.01,
        slider_width: 700
			}
		],
		timeline_variables: [
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryBaVisualBa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Pa','Ga','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryBaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Ga','Da','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryDaVisualMa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Ta','Ga','Da'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryMaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Ga','Na','Ba'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryMaVisualMa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Pa','Ga','Ba'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryNaVisualDa.mp4'], syllables: jsPsych.randomization.repeat(['Na','Da','Ka','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryPaVisualPa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Pa','Ga','Ta'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryPaVisualTa.mp4'], syllables: jsPsych.randomization.repeat(['Pa','Ta','Da','Ka'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryTaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ta','Ga','Ka','Da'],1) },

		],
		randomize_order: true,
    	repetitions: 1
	}
	timeline.push(practice_trial);

    var practice_trial_end = {
      type: "html-keyboard-response",
      stimulus: "You have finished the practice trials. We will now proceed to the real experiment. The experiment's design consists of blocks of trials that each take around 6 minutes. There will be break screens with unlimited time between these blocks. Press any key to begin the experiment."
    };
    timeline.push(practice_trial_end);

	var mcGurkProcedure1 = {
		timeline: [
			{
				type: 'video-button-response',
				sources: jsPsych.timelineVariable('video'),
				width: 800,
				choices: [],
				data: jsPsych.timelineVariable('video'), /* Store the video name */
				trial_ends_after_video: true,
				prompt: '<p></p>'

      },
			{
				type: 'video-button-response',
				sources: [],
				width: 800,
				choices: jsPsych.timelineVariable('syllables'),
				data: jsPsych.timelineVariable('syllables'), /* Store the answer choices on that trial */
				prompt: '<p>Which syllable did you perceive?</p>'
			},
      {
      type: 'html-slider-response',
      stimulus: '<p>Were the auditory and visual syllables the same, or different?</p>',
      labels: ['1<br>Definitely same<br>','2','3<br>Probably same<br>','4','5<br>Not sure<br>','6','7<br>Probably different','8','9<br>Definitely different<br>'],
      min: 1,
      max: 9,
      start: function(){
        return jsPsych.randomization.sampleWithoutReplacement([10, 20, 30, 40, 50, 60, 70, 80, 90], 1)[0];
        },
      step: 0.01,
      slider_width: 700
    }
		],
		timeline_variables: [
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryBaVisualBa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Pa','Ga','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryBaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Ga','Da','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryDaVisualMa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Ta','Ga','Da'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryMaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Ga','Na','Ba'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryMaVisualMa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Pa','Ga','Ba'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryNaVisualDa.mp4'], syllables: jsPsych.randomization.repeat(['Na','Da','Ka','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryPaVisualPa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Pa','Ga','Ta'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryPaVisualTa.mp4'], syllables: jsPsych.randomization.repeat(['Pa','Ta','Da','Ka'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryTaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ta','Ga','Ka','Da'],1) },

		],
		randomize_order: true,
    	repetitions: 5
	}
	timeline.push(mcGurkProcedure1);

  var rest1 = {
      type: "html-keyboard-response",
      stimulus: "You will now have a short break. There is no time limit. Press any key to resume the experiment."
  };
  timeline.push(rest1);

  var mcGurkProcedure2 = {
    timeline: [
			{
				type: 'video-button-response',
				sources: jsPsych.timelineVariable('video'),
				width: 800,
				choices: [],
				data: jsPsych.timelineVariable('video'), /* Store the video name */
				trial_ends_after_video: true,
				prompt: '<p></p>'

      },
			{
				type: 'video-button-response',
				sources: [],
				width: 800,
				choices: jsPsych.timelineVariable('syllables'),
				data: jsPsych.timelineVariable('syllables'), /* Store the answer choices on that trial */
				prompt: '<p>Which syllable did you perceive?</p>'
			},
      {
      type: 'html-slider-response',
      stimulus: '<p>Were the auditory and visual syllables the same, or different?</p>',
      labels: ['1<br>Definitely same<br>','2','3<br>Probably same<br>','4','5<br>Not sure<br>','6','7<br>Probably different','8','9<br>Definitely different<br>'],
      min: 1,
      max: 9,
      start: function(){
        return jsPsych.randomization.sampleWithoutReplacement([10, 20, 30, 40, 50, 60, 70, 80, 90], 1)[0];
        },
      step: 0.01,
      slider_width: 700
    }
		],
		timeline_variables: [
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryBaVisualBa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Pa','Ga','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryBaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Ga','Da','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryDaVisualMa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Ta','Ga','Da'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryMaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Ga','Na','Ba'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryMaVisualMa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Pa','Ga','Ba'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryNaVisualDa.mp4'], syllables: jsPsych.randomization.repeat(['Na','Da','Ka','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryPaVisualPa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Pa','Ga','Ta'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryPaVisualTa.mp4'], syllables: jsPsych.randomization.repeat(['Pa','Ta','Da','Ka'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryTaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ta','Ga','Ka','Da'],1) },

		],
		randomize_order: true,
    	repetitions: 5
	}
	timeline.push(mcGurkProcedure2);

  var rest2 = {
      type: "html-keyboard-response",
      stimulus: "You will now have a short break. There is no time limit. Press any key to resume the experiment."
  };
  timeline.push(rest2);

  var mcGurkProcedure3 = {
    timeline: [
			{
				type: 'video-button-response',
				sources: jsPsych.timelineVariable('video'),
				width: 800,
				choices: [],
				data: jsPsych.timelineVariable('video'), /* Store the video name */
				trial_ends_after_video: true,
				prompt: '<p></p>'

      },
			{
				type: 'video-button-response',
				sources: [],
				width: 800,
				choices: jsPsych.timelineVariable('syllables'),
				data: jsPsych.timelineVariable('syllables'), /* Store the answer choices on that trial */
				prompt: '<p>Which syllable did you perceive?</p>'
			},
      {
      type: 'html-slider-response',
      stimulus: '<p>Were the auditory and visual syllables the same, or different?</p>',
      labels: ['1<br>Definitely same<br>','2','3<br>Probably same<br>','4','5<br>Not sure<br>','6','7<br>Probably different','8','9<br>Definitely different<br>'],
      min: 1,
      max: 9,
      start: function(){
        return jsPsych.randomization.sampleWithoutReplacement([10, 20, 30, 40, 50, 60, 70, 80, 90], 1)[0];
        },
      step: 0.01,
      slider_width: 700
    }
		],
		timeline_variables: [
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryBaVisualBa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Pa','Ga','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryBaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Ga','Da','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryDaVisualMa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Ta','Ga','Da'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryMaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Ga','Na','Ba'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryMaVisualMa.mp4'], syllables: jsPsych.randomization.repeat(['Ma','Pa','Ga','Ba'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryNaVisualDa.mp4'], syllables: jsPsych.randomization.repeat(['Na','Da','Ka','Ma'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryPaVisualPa.mp4'], syllables: jsPsych.randomization.repeat(['Ba','Pa','Ga','Ta'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryPaVisualTa.mp4'], syllables: jsPsych.randomization.repeat(['Pa','Ta','Da','Ka'],1) },
      { video: ['https://crubiera.github.io/jsPsychSheet/experiment/video/AuditoryTaVisualGa.mp4'], syllables: jsPsych.randomization.repeat(['Ta','Ga','Ka','Da'],1) },

		],
		randomize_order: true,
    	repetitions: 5
	}
	timeline.push(mcGurkProcedure3);

  var experiment_end = {
      type: "html-keyboard-response",
      stimulus: "Congratulations! You have reached the end of the experiment. Please do not close your window until it says that the data has finished uploading on the next screen. Press any key to upload your results."
  };
  timeline.push(experiment_end);

	/* start the experiment */
	jsPsych.init({
  		timeline: timeline,
        on_trial_finish: session.insert
  		show_progress_bar: true,
  		on_finish: function() { window.top.location.href = `https://ufl.sona-systems.com/webstudy_credit.aspx?experiment_id=140&credit_token=43ba572f7dff44738a689f86883c905b&survey_code=${survey_code}`}
	});
    }
}
