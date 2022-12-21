import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import interactionPlugin from "@fullcalendar/interaction";
import initialEvents from './initialEvents';

function getEvent(element){
    setTimeout(() => {
      axios.get(`${element.href}/true`)
      .then(response => {
        const container = document.querySelector('.full-calendar #event-infos');
        container.style.border = '2px solid #0000001c';
        container.innerHTML = response.data;
      })
      .catch(error => console.log(error));
      }, 500)
}

export default async function handleFullCalendar(){

  try {
    const data = await initialEvents();
    const calendarEl = document.getElementById('calendar');
    const divCalendar = document.querySelector('.full-calendar')
    divCalendar.style.display = 'grid';
  
    const calendar = new Calendar(calendarEl, {
      plugins: [ interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin ],
      initialView: 'dayGridMonth',
      locale: ptBrLocale,
      displayEventTime: true,
      slotLabelFormat: 'HH:mm',
      headerToolbar: {
        left: "prev,next today",
        center: 'title',
        right: 'dayGridMonth,listWeek'
      },
      // timeGridWeek timeGridDay // not
      //listWeek,dayGridMonth // work
      initialDate: Date.now(),
      navLinks: true,
      selectable: true,
      editable: true,
      dayMaxEvents: true,
      titleFormat: {
        year: 'numeric', month: 'numeric', day: 'numeric',
      },
      buttonText: {
        today: 'Hoje',
        month: 'Mês',
        week: 'Semana',
        day: 'Hoje',
        list: 'Lista'
      },
      events: data,
      eventColor: '#000'
    });
  
    calendar.setOption('locale', 'pt-br');
    calendar.render();

    document.addEventListener('click', (event) => {     
      if (event.target.href.includes('/api/mostrar/evento')){
        event.preventDefault();
        calendarEl.style.gridColumn = '1';
        getEvent(event.target);
      }
    });

    const btnClose = document.querySelector('#btn-calendario-close');
    btnClose.onclick = () => 
    {
    const container = document.querySelector('.full-calendar #event-infos');
    container.style.border = 'none';
    document.querySelector('.full-calendar #event-infos').innerHTML = "";
    divCalendar.style.display = 'none';
    calendarEl.style.gridColumn = '1/-1';
    }
  } catch (e) {
    console.log(e)
  }
}
