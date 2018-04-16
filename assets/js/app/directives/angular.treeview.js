/*
 @license Angular Treeview version 0.1.6
 ⓒ 2013 AHN JAE-HA http://github.com/eu81273/angular.treeview
 License: MIT


 [TREE attribute]
 angular-treeview: the treeview directive
 tree-id : each tree's unique id.
 tree-model : the tree model on $scope.
 node-id : each node's id
 node-label : each node's label
 node-children: each node's children

 <div
 data-angular-treeview="true"
 data-tree-id="tree"
 data-tree-model="roleList"
 data-node-id="roleId"
 data-node-label="roleName"
 data-node-children="children" >
 </div>
 */

(function (angular) {
  'use strict';

  angular.module('elearnerApp').directive('treeModel', ['$compile', function ($compile) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        //tree id
        var treeId = attrs.treeId;

        //tree model
        var treeModel = attrs.treeModel;

        var treePadding = parseInt(attrs.treePadding);

        var nextTreePadding = treePadding + 5;

        //node id
        //var nodeId = attrs.nodeId || 'id';
        //var node = attrs.node

        //node label
        var nodeLabel = attrs.nodeLabel || 'label';

        //children
        var nodeChildren = attrs.nodeChildren || 'children';

        //tree template
        var template =
          '<ul ng-hide="node.collapsed">' +
          '<li data-ng-repeat="node in ' + treeModel + '" ng-class="{\'border-line\':node.'+nodeChildren+'.length>0}">' +
          '<div ng-class="{\'parentNode\':node.'+nodeChildren+'.length>0}">' +
          '<div style="margin-left: '+ treePadding +'px" class="wrapText">' +
          '<i class="fa fa-chevron-right" data-ng-show="node.' + nodeChildren + '.length && node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
          '<i class="fa fa-chevron-down" data-ng-show="node.' + nodeChildren + '.length && !node.collapsed" data-ng-click="' + treeId + '.selectNodeHead(node)"></i>' +
          '<i class="normal" data-ng-hide="node.' + nodeChildren + '.length"></i> ' +
          '<span data-ng-class="{\'selected\':node.selected}" data-ng-click="' + treeId + '.selectNodeLabel(node)" title="{{node.' + nodeLabel + '}}">{{node.' + nodeLabel + '}}</span>' +
          '<i ng-show="node.hasRead || node.passed" class="fa fa-check completed_circle" aria-hidden="true"></i>' +
          '</div>' +
          '</div>' +
          '<div style="margin-left: '+ treePadding +'px">' +
          '<div data-ng-hide="node.collapsed" data-tree-id="' + treeId + '" data-tree-model="node.' + nodeChildren + '" data-node-label=' + nodeLabel + ' data-node-children=' + nodeChildren + ' data-tree-padding="'+nextTreePadding+'"></div>' +
          '</div>' +
          '</li>' +
          '</ul>';


        //check tree id, tree model
        if (treeId && treeModel) {

          //root node
          if (attrs.angularTreeview) {

            //create tree object if not exists
            scope[treeId] = scope[treeId] || {};

            //if node head clicks,
            scope[treeId].selectNodeHead = scope[treeId].selectNodeHead || function (selectedNode) {

                //Collapse or Expand
                selectedNode.collapsed = !selectedNode.collapsed;
              };

            //if node label clicks,
            scope[treeId].selectNodeLabel = scope[treeId].selectNodeLabel || function (selectedNode) {

                //remove highlight from previous node
                if (scope[treeId].currentNode && scope[treeId].currentNode.selected) {
                  scope[treeId].currentNode.selected = undefined;
                }

                //set highlight to selected node
                selectedNode.selected = true;

                //set currentNode
                scope[treeId].currentNode = selectedNode;
                scope.onChapterSelected(selectedNode);
              };
          }

          //Rendering template.
          element.html('').append($compile(template)(scope));
        }
      }
    };
  }]);
})(angular);
