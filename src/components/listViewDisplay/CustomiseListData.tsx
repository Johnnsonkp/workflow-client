import React from 'react'

function CustomiseListData(listTasks, showArchive) {
    function chunk<T>(array: T[], size: number): T[][] {
        if (!array.length) {
          return [];
        }
        const head = array.slice(0, size);
        const tail = array.slice(size);
        return [head, ...chunk(tail, size)];
    }
    
    const listItems = (listTasks, showArchive) => {
        let sortedList = Array.isArray(listTasks)? listTasks.sort(function(a, b){return a.order-b.order}) : listTasks

        let archiveTasks = sortedList.filter((task) => task.number == 'archive')
        let nonArchiveTasks = sortedList.filter((task) => task.number !== 'archive')

        let showHideArchive = showArchive? archiveTasks.concat(nonArchiveTasks) 
        : nonArchiveTasks
        
        return showHideArchive
    }
    
    const data = chunk(
        Array(30)
            .fill(0)
            .map((_, index) => ({ 
            id: index, 
            task: listItems(listTasks, showArchive)
        })),
        7
    );

  return data
}

export default CustomiseListData