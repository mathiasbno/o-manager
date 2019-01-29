// Use jQuery since I'm lazy :P

function fetchEventPreview(eventor, eventId) {
  console.log({
    "eventor": eventor,
    "id": eventId
  });
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `/api/process/preview/${eventor}/${eventId}`,
    }).done(function (data) {
      resolve(data);
    }).fail(function (error) {
      reject(error);
    });
  });
}

function processEvent(eventor, eventId, dryrun = true, eventStatus) {
  console.log({
    "eventor": eventor,
    "id": eventId,
    "dryrun": dryrun
  });
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `/api/process/${eventor}/${eventId}?dryrun=${dryrun}&eventStatus=${eventStatus}`,
    }).done(function (data) {
      resolve(data);
    }).fail(function (error) {
      reject(error);
    });
  });
}

function deleteModel(model) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `/api/${model}/delete`,
    }).done(function (data) {
      resolve(data);
    }).fail(function (error) {
      reject(error);
    });
  });
}

function populateEvents() {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `/api/events`,
    }).done(function (data) {
      resolve(data);
    }).fail(function (error) {
      reject(error);
    });
  });
}

$(document).ready(function () {
  $('#processForm').change(function (e) {
    const eventor = $('#eventor option:selected').val();
    const eventId = $('#eventId').val();

    if (eventId.length >= 3 && eventor.length) {
      $('#previewButton').removeAttr('disabled');
    } else {
      $('#previewButton').attr('disabled');
    };
  });

  $('#previewButton').on('click', function () {
    const eventor = $('#eventor option:selected').val();
    const eventId = $('#eventId').val();

    fetchEventPreview(eventor, eventId).then(function (data) {
      $('#eventStatus').val(data.eventStatus);
      $('#preview').text(JSON.stringify(data, null, 4));
      $('#processButton').removeAttr('disabled');
      $('#eventor').attr('disabled', 'disabled');
      $('#eventId').attr('readonly', 'readonly');
    });
  });

  $('#reset').on('click', function () {
    $('#eventStatus').val('');
    $('#preview').text('Preview…');
    $('#eventData').text('Event data…');
    $('#eventMetadata').text('Event metadata…');
    $('#previewButton').attr('disabled', 'disabled');
    $('#processButton').attr('disabled', 'disabled');
    $('#eventor').val('').removeAttr('disabled');
    $('#eventId').val('').removeAttr('readonly');
  });

  $('#processButton').on('click', function () {
    const eventor = $('#eventor option:selected').val();
    const eventId = $('#eventId').val();
    const dryrun = $('#dryrun').is(":checked");
    const eventStatus = $('#eventStatus').val();

    processEvent(eventor, eventId, dryrun, eventStatus).then(function (data) {
      $('#eventData').text(JSON.stringify(data, null, 4));
      console.log(data);
      const metadata = {
        classes: data.event.classes.length,
        nations: data.nations.length,
        teams: data.teams.length,
        runners: data.runners.length
      };
      $('#eventMetadata').text(JSON.stringify(metadata, null, 4));
    });
  });

  let i = 0;

  $('#addPlayerEventClass').on('click', function () {
    const className = $('#className').val();
    const runnersInTeam = $('#runnersInTeam').val();
    const budget = $('#budget').val();
    const playerEventClassGender = $('#playerEventClassGender option:selected').val();
    const startDate = $('#startDate').val();
    const lockDate = $('#lockDate').val();

    if (className) {
      const _class = {
        id: i,
        className,
        runnersInTeam,
        budget,
        playerEventClassGender,
        startDate,
        lockDate
      }

      if ($('#playerEventClasses').html() === 'Classes…') {
        $('#playerEventClasses').html('[]');
      }

      $('#playerEventClasses').after(`<button data-id="${i}" class="removeClass" type="button">Remove ${i}</button>`);
      const json = JSON.parse($('#playerEventClasses').html());

      json.push(_class);

      console.log(json, _class);

      $('#playerEventClasses').html(JSON.stringify(json, null, 4));

      $('#className').val('');
      $('#runnersInTeam').val('');
      $('#budget').val('');
      $('#playerEventClassGender option:selected').val('');
      $('#startDate').val('');
      $('#lockDate').val('');

      i = i + 1;
    } else {
      console.log('Fyll ut alt');
    }
  });

  $(document).on('click', '.removeClass', function () {
    const id = $(this).data('id');
    const json = JSON.parse($('#playerEventClasses').text());

    const _json = json.filter(function (index) {
      return index.id !== id;
    });

    $('#playerEventClasses').html(JSON.stringify(_json, null, 4));
    $(this).remove();
  });

  $('.deleteButton').on('click', function (e) {
    const model = $(e.target).data('model');
    const output = $('#deleteOutput').html();
    const confirmation = confirm(`Are you sure you want to delete ${model}?`);
    if (confirmation) {
      deleteModel(model).then(function (data) {
        if (output === 'Delete output…') {
          $('#deleteOutput').html('');
        }
        $('#deleteOutput').html($('#deleteOutput').html() + JSON.stringify(data, null, 4));
      }).catch(function (error) {
        $('#deleteOutput').html($('#deleteOutput').html() + JSON.stringify(error, null, 4));
      });
    }
  });

  populateEvents().then(function (data) {
    data.forEach(event => {
      if (new Date(event.startDate).getTime() < new Date().getTime()) {
        $('#oldRace').append(`<option value="${event.id}">${event.name}</option>`);
      } else {
        $('#newRace').append(`<option value="${event.id}">${event.name}</option>`);
      }
    });
  });

});
