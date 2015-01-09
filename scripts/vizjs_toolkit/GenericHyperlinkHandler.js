/*
 * Copyright (C) 2005 - 2014 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased  a commercial license agreement from Jaspersoft,
 * the following license terms  apply:
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License  as
 * published by the Free Software Foundation, either version 3 of  the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero  General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public  License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * @author: Gianluca Natali (gnatali@tibco.com)
 * 
 */

define(['jquery'], function($) {
	
	
	var GenericHyperlink = function(arrHyperlinks) {
        this.hyperlinks = arrHyperlinks;
        this.reportInstance = null;
        this.reportContainer = null;
		this.mode = null;
    };
	
    GenericHyperlink.prototype = {
        register: function() {
            var it = this;
            $(it.hyperlinks[0].selector).on('click', function(evt) {
                var hlData = it.getHyperlinkData($(this).attr('data-id'));
                if (hlData) {
                    it.handleHyperlinkClick(hlData);
                }
            }).css('cursor', 'pointer');
        },
        handleInteraction: function(evt) {
            if ('hyperlinkClicked' == evt.type) {
                var hlData = this.getHyperlinkData(evt.data.hyperlink.id);
                if (hlData) {
                    this.handleHyperlinkClick(hlData);
                }
            }
        },
		/* This function will be inherited from the child objects. 
		 * It is the function to override in order to add custom HyperlinkHandling behaviors
		*/
		handleHyperlinkClick: function(hyperlink) {
			this.mode = hyperlink.params.mode || "dialog";
                       
        },
		//getMode
		getMode: function(){
			return this.mode ;
		},
		/*This method opens a dialog and return the name of the inner report div*/
		openDialog : function(hyperlink){
		
			var dialogId = hyperlink.params.container || "container";	
			var d_width = hyperlink.params.width || "auto";
			var d_height = hyperlink.params.height  || "auto";
			var d_title = hyperlink.params.title  || "Dialog";
			var reportDivId = dialogId + "Int";	
			
			if ( $( "#"+dialogId ).length == 0 ) {
				var new_dialog = $('<div id="'+dialogId+'"><div id="'+reportDivId+'" style="width:100%;height:100%;"></div></div>');
				new_dialog.insertAfter('#reportContainer');
			}

			$("#"+dialogId).dialog({ height: d_height, width: d_width, title: d_title });
			return "#"+reportDivId;
		},
		

        
        getHyperlinkData: function(id) {
            var hlData = null;
            $.each(this.hyperlinks, function(i, hl) {
                if (id === hl.id) {
                    hlData = hl;
                    return false; //break each
                }
            });
            return hlData;
        }
        
    };

    return GenericHyperlink;
});
