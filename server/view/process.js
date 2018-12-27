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

function processEvent(eventor, eventId, dryrun = true) {
  console.log({
    "eventor": eventor,
    "id": eventId,
    "dryrun": dryrun
  });
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: `/api/process/${eventor}/${eventId}?dryrun=${dryrun}`,
    }).done(function (data) {
      resolve(data);
    }).fail(function (error) {
      reject(error);
    });
  });
}

$(document).ready(function () {
  $('#processForm').change(function (e) {
    console.log('form updated', e);

    const eventor = $('#eventor option:selected').val();
    const eventId = $('#eventId').val();

    // TODO: Up the min length to 4
    if (eventId.length >= 1 && eventor.length) {
      $('#previewButton').removeAttr('disabled');
    } else {
      $('#previewButton').attr('disabled');
    };
  });

  $('#previewButton').on('click', function () {
    const eventor = $('#eventor option:selected').val();
    const eventId = $('#eventId').val();

    fetchEventPreview(eventor, eventId).then(function (data) {
      $('#preview').text(JSON.stringify(data, null, 4));
      $('#processButton').removeAttr('disabled');
      $('#eventor').attr('disabled', 'disabled');
      $('#eventId').attr('readonly', 'readonly');
    });
  });

  $('#reset').on('click', function () {
    $('#preview').text('Preview…');
    $('#eventData').text('Event data…');
    $('#previewButton').attr('disabled', 'disabled');
    $('#processButton').attr('disabled', 'disabled');
    $('#eventor').val('').removeAttr('disabled');
    $('#eventId').val('').removeAttr('readonly');
  });

  $('#processButton').on('click', function () {
    const eventor = $('#eventor option:selected').val();
    const eventId = $('#eventId').val();
    const dryrun = $('#dryrun').is(":checked");

    processEvent(eventor, eventId, dryrun).then(function (data) {
      $('#eventData').text(JSON.stringify(data, null, 4));
    });
  });

});
